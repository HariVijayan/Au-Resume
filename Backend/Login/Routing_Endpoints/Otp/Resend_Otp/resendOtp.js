import express from 'express';
import User from '../../../Database_Models/User.js';
import Otp from '../../../Database_Models/Otp.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
const OTP_REQUEST_LIMIT = 60 * 1000; // 1 minute

const generateStrongOtp = (length = 6) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()';
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
};

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

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const lastOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
        if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < OTP_REQUEST_LIMIT) {
            return res.status(429).json({ message: 'Too many OTP requests. Try again in 1 minute.' });
        }

        const otp = generateStrongOtp(6);
        const createdAt = new Date(Date.now());
        const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

        await Otp.deleteMany({ email });

        await Otp.create({
            email,
            otp,
            createdAt,
            createdAtFormatted: formatISTTimestamp(createdAt),
            expiresAt,
            expiresAtFormatted: formatISTTimestamp(expiresAt)
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Resend OTP Request',
            text: `Your new OTP is: ${otp}. It is valid for 10 minutes.`
        };
        await transporter.sendMail(mailOptions);

        res.json({ message: 'New OTP sent to email' });

    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default router;