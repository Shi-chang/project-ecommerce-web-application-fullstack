import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// The user schema includes name, email, password, avatar, role('user' or 'admin') and
// created time.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: [40, 'Username cannot exceed 40 characters'],
        required: [true, 'Username is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        validate: [validator.isEmail, 'Invalid email address provided.']
    },
    password: {
        type: String,
        minLength: [6, 'Password must be at least 6 characters'],
        required: [true, 'Password is required.'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: [true, 'Public ID is required.'],
        },
        url: {
            type: String,
            required: [true, 'Avatar URL is required.'],
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Number
});

// Encrypts user password before saving, so that the original password is protected.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Self-defined instance method that compares if encryption of the user input password 
// matches the stored encrypted password.
userSchema.methods.comparePassword = async function (passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password);
};

// Self-defined instance method that returns the JWT token.
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_TIME
        });
}

// Self-defined instance method that creates password reset token.
userSchema.methods.getPasswordResetToken = function () {
    // Creates random bytes and hash it as password token.
    const resetToken = crypto.randomBytes(30).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expiry time(60 minutes) for the token.
    this.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    return resetToken;
}

const User = mongoose.model('User', userSchema);
export default User;
