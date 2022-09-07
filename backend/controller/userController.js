import crypto from 'crypto';
import User from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js';
import sendEmail from '../utils/sendEmails.js';
import cloudinary from 'cloudinary';

// This user controller controles the CRUD operations of users.

// Registers a new user (/register).
export const registerUser = catchAsyncError(async (req, res, next) => {
    // Sets the user avatar.
    let defaultAvatarUrl = 'https://res.cloudinary.com/all-you-need/image/upload/v1662226919/project-all-you-need/default-images/default-avatar_fws1bo.svg';
    let userAvatar = req.body.avatar === '' ? defaultAvatarUrl : req.body.avatar;

    const result = await cloudinary.v2.uploader.upload(userAvatar, {
        folder: 'project-all-you-need/avatars',
        width: 150,
        crop: "scale"
    });

    // Sets the user name, email and password.
    const { name, email, password } = req.body;
    // If the user already exists, throw an error.
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler('This emails address has already been registered.', 401));
    }
    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    });

    // If the user is successfully created, send the user and token information to
    // the front end.
    sendToken(user, 200, res);
});

// Log in the user (/login).
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email or password is empty.
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password.', 400));
    }

    // Check if the user is in the database.
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid email.', 401));
    }

    // Check if the password is correct.
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
        return next(new ErrorHandler('Invalid password.', 401));
    }
    // If the user is logged in successfully, send the user and token information to
    // the front end.
    sendToken(user, 200, res);
});

// Log out the user (/logout).
export const logoutUser = catchAsyncError(async (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
    }

    // When the user is logged out, the token stored in the user's browser will be set
    // to null.
    res.status(200).cookie('token', null, options).json({
        success: true,
        message: 'Successfully logged out.'
    });
});

// Handles forgot password for the user (/password/forgot).
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('This email address has not registered.', 404));
    }

    // Gets a reset token
    const resetToken = user.getPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // Creates url for password resetting
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
    const message = `You are trying to reset your password. Please click the link below to reset your password: \n\n${resetUrl}\n\nIf this is no a request from you, please report to the customer service immediately.`
    try {
        await sendEmail({
            email: user.email,
            subject: "password reset",
            message: message
        });
        res.status(200).json({
            success: true,
            message: `A password recovery email successfully sent to ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler("error.message", 500));
    }
});

// Handles reset password for the user (/password/reset/:token).
export const resetPassword = catchAsyncError(async (req, res, next) => {
    // Hashes url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    // Handles when the password reset link is expired.
    if (!user) {
        return next(new ErrorHandler("Invalid password reset token or expired link.", 400));
    }
    // Sets up new password.
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    // sendToken(user, 200, res);
    res.status(200).json({
        success: true,
        message: "Password reset successfully."
    });
})

// Updates password for the user (/password/update).
export const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Checkes if the old password is correct.
    const oldPasswordCorrect = await user.comparePassword(req.body.oldPassword);
    if (!oldPasswordCorrect) {
        return next(new ErrorHandler("Old password incorrect.", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Gets profile details of currently logged in user (/me).
export const getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user: user
    });
});

// Updates user profile, initiated by the user (/me/update).
export const updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    // If the user made a change to the avatar, destroy the previous avatar and create a new iamge
    // in the cloudinary.
    if (req.body.avatar !== '') {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'project-all-you-need/avatars',
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        };
    }
    // Update the user information in the database.
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true
    });
})

// Updates user profile, initiated by the admin (/admin/user/:id).
export const updateUser = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.eamil,
        role: req.body.role
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true
    });
});

// Get all users by the admin (/admin/users).
export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users: users
    });
});

// Get user details by the admin (/admin/user/:id).
export const getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // If the user cannot be found, return an informative error.
    if (!user) {
        return next(new ErrorHandler(`User with id = ${req.params.id} not found.`, 400));
    }
    res.status(200).json({
        success: true,
        user: user
    });
});

// Delete user by the admin (/admin/user/id).
export const deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // If the user cannot be found, return an informative error.
    if (!user) {
        return next(new ErrorHandler(`User with id = ${req.params.id} not found.`, 400));
    }
    await user.remove();
    res.status(200).json({
        success: true
    });
});
