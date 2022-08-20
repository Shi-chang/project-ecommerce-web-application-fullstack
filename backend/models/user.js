import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

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
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password);
};

// Return the JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_TIME
        });
}

// Create password reset token
userSchema.methods.getPasswordResetToken = function () {
    // Create random bytes and hash it as password token
    const resetToken = crypto.randomBytes(30).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expiry time(15 minutes) for the token
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    return resetToken;
}


const User = mongoose.model('User', userSchema);

export default User;