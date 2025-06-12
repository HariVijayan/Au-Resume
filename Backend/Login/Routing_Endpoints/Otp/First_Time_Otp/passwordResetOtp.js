import express from "express";
import User from "../../../Database_Models/User.js";
import adminUser from "../../../Database_Models/adminUser.js";
import Otp from "../../../Database_Models/Otp.js";
import adminOtp from "../../../Database_Models/adminOtp.js";
import nodemailer from "nodemailer";

const router = express.Router();

const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes
const OTP_REQUEST_LIMIT = 60 * 1000; // 1 minute

const generateStrongOtp = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .replace(",", "");
};

router.post("/password-reset-otp", async (req, res) => {
  const { email, isAdmin } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let user;

    if (isAdmin) {
      user = await adminUser.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    let lastOtp;

    if (isAdmin) {
      lastOtp = await adminOtp.findOne({ email }).sort({ createdAt: -1 });
    } else {
      lastOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });
    }

    if (
      lastOtp &&
      Date.now() - lastOtp.createdAt.getTime() < OTP_REQUEST_LIMIT
    ) {
      return res
        .status(429)
        .json({ message: "Too many OTP requests. Try again in 1 minute." });
    }

    const otp = generateStrongOtp(6);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

    if (isAdmin) {
      await adminOtp.deleteMany({ email });

      // Save new OTP
      await adminOtp.create({
        email,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Password Reset",
      });
    } else {
      await Otp.deleteMany({ email });

      // Save new OTP
      await Otp.create({
        email,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
      });
    }

    let mailOptions;

    if (isAdmin) {
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Admin - Password Reset OTP",
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      };
    } else {
      mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      };
    }
    await transporter.sendMail(mailOptions);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
