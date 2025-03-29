import express from 'express';
import User from '../../../Database_Models/User.js';
import RefreshToken from '../../../Database_Models/RefreshToken.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

const decryptRefreshToken = (encryptedEmail, secretKey) => {
    return crypto.createHmac('sha256', secretKey).update(encryptedEmail).digest('hex');
};

router.post('/check-access', async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken || !refreshToken) return res.status(401).json({ message: 'No token provided' });

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(403).json({ message: 'User not found' });

        const validToken = await RefreshToken.findOne({ email: user.email, token: refreshToken });

        if (!validToken || validToken.expiresAt < Date.now()) {
            await RefreshToken.deleteMany({ email: user.email });
            res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
            res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
            return res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
        }

        // Validate refresh token using secretKey
        const decryptedEmail = decryptRefreshToken(user.email, user.secretKey);
        if (decryptedEmail !== refreshToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Generate new access token
        const newAccessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict', maxAge: 60 * 60 * 1000 });

        res.json({ message: 'Access token refreshed' });

    } catch (error) {
        console.error('Checking Access Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
