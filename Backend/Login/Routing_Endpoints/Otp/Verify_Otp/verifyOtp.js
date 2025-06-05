import express from 'express';
import Otp from '../../../Database_Models/Otp.js';

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const storedOtp = await Otp.findOne({ email, otp });

        if (!storedOtp) return res.status(400).json({ message: 'Invalid OTP' });

        if (storedOtp.expiresAt < Date.now()) {
            await Otp.deleteMany({ email });
            return res.status(400).json({ message: 'OTP expired' });
        }

        await Otp.deleteMany({ email });

        res.json({ message: 'OTP verified successfully. You can now reset your password.' });

    } catch (error) {
        console.error('OTP Verification error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;