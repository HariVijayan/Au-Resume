import express from 'express';
import User from '../../../Database_Models/User.js';
import RefreshToken from '../../../Database_Models/RefreshToken.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes

const formatISTTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
    }).format(date).replace(',', '');
};

const encryptEmail = (email, secretKey) => {
    return crypto.createHmac('sha256', secretKey).update(email).digest('hex');
};

router.post('/login', async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User dosen\'t exist.' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            const remainingLockTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(403).json({ message: `Account locked. Try again in ${remainingLockTime} minutes.` });
        }

        const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');

        if (hashedInputPassword !== user.password) {
            user.failedLoginAttempts += 1;

            // Lock account if max attempts exceeded
            if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
                user.lockUntil = new Date(Date.now() + LOCK_TIME);
                user.lockUntilFormatted = formatISTTimestamp(user.lockUntil);
                await user.save();
                return res.status(403).json({ message: 'Too many failed attempts. Account locked for 30 minutes.' });
            }

            await user.save();
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Successful login → Reset failed attempts
        user.failedLoginAttempts = 0;
        user.lockUntil = null;
        await user.save();

        // Generate JWT Access Token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Generate Secure Refresh Token
        const refreshToken = encryptEmail(user.email, user.secretKey);

        await RefreshToken.deleteMany({ email: user.email }); // Clear old tokens

        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + (rememberMe ? 7 : 1) * 24 * 60 * 60 * 1000);

        await RefreshToken.create({
            email: user.email,
            token: refreshToken,
            createdAt: createdAt,
            createdAtFormatted: formatISTTimestamp(createdAt),
            expiresAt: expiresAt,
            expiresAtFormatted: formatISTTimestamp(expiresAt),
        });

        res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000 });

        res.json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;