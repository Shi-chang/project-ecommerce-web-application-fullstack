import User from '../models/user.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncError from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwtToken.js';
import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import sendEmail from '../utils/sendEmails.js';
import crypto from 'crypto';
import { userInfo } from 'os';

// register a new user =>  /api/v1/register
export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto',
            url: 'https://thumbs.dreamstime.com/z/vector-illustration-isolated-white-background-user-profile-avatar-black-line-icon-user-profile-avatar-black-solid-icon-121102166.jpg'
        }
    });

    sendToken(user, 200, res);
});

// Login user =>  /api/v1/login
export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password are input
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password.', 400));
    }

    // Check if the user is in the database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email.', 401));
    }

    // Check if the password is correct
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
        return next(new ErrorHandler('Invalid password.', 401));
    }

    sendToken(user, 200, res);
});

// Logout user => /api/v1/logout
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
    }
    res.status(200).cookie('token', null, options).json({
        success: true,
        message: 'Successfully logged out.'
    });
});

// Forgot password => /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler('This email has not registered.', 404));
    }

    // Get reset token
    const resetToken = user.getPasswordResetToken();

    await user.save({ validateBeforeSave: false });

    // Create url for password resetting
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
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

// Reset password => /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("You password reset link has expired.", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match.", 400));
    }

    // Set up new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Update password => /api/v1/password/update
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check if the old password is correct
    const oldPasswordCorrect = await user.comparePassword(req.body.oldPassword);
    if (!oldPasswordCorrect) {
        return next(new ErrorHandler("Old password incorrect.", 400));
    }

    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// Get details of currently logged in user => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user: user
    });
});

// Update user profile, initiated by the user => /api/v1/me/update
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // Update avatar: Todo

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true
    });
})

// Update user profile, initiated by the admin => /api/v1/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
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

// Get all users => /api/v1/admin/users
export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users: users
    });
});

// Get user details => /api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User with id = ${req.params.id} not found.`, 400));
    }
    res.status(200).json({
        success: true,
        user: user
    });
});

// Delete user => /api/v1/admin/user/id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User with id = ${req.params.id} not found.`, 400));
    }

    // Remove the user's avatar info from Cloudinary

    await user.remove();

    res.status(200).json({
        success: true
    });
});