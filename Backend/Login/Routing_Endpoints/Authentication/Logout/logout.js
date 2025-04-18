import express from 'express';
import currentSession from '../../../Database_Models/currentSession.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/logout', async (req, res) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) return res.status(401).json({ message: 'No access token provided' });

        const { userId, sessionId } = jwt.verify(accessToken, process.env.JWT_SECRET);

        await currentSession.deleteOne({ userId, sessionId });

        res.clearCookie('accessToken', { httpOnly: true, secure: true, sameSite: 'Strict' });

        res.json({ message: 'Logged out' });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
