import express from 'express';
import RefreshToken from '../../../Database_Models/RefreshToken.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/refresh-token', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const storedToken = await RefreshToken.findOne({ email: decoded.email, token: refreshToken });

        if (!storedToken) return res.status(403).json({ message: 'Invalid refresh token' });

        if (storedToken.expiresAt < Date.now()) {
            await RefreshToken.deleteMany({ email: decoded.email });
            return res.status(403).json({ message: 'Refresh token expired. Please log in again.' });
        }

        const newAccessToken = jwt.sign(
            { email: decoded.email, type: 'access' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000,
        });

        res.json({ message: 'Access token refreshed' });

    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;