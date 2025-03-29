import express from 'express';
import RefreshToken from '../../../Database_Models/RefreshToken.js';

const router = express.Router();

router.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

        await RefreshToken.deleteMany({ token: refreshToken });

        res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.json({ message: 'Logged out from all devices' });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
