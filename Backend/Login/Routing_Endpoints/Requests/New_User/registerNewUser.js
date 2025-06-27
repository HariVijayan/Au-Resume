import express from "express";
import User from "../../../Database_Models/User.js";
import Otp from "../../../Database_Models/Otp.js";
import PendingUser from "../../../Database_Models/PendingUser.js";
import crypto from "crypto";
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

function isPasswordStrong(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password); // Matches special characters

  if (password.length < minLength) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (!hasUpperCase) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasLowerCase) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }
  if (!hasNumber) {
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };
  }
  if (!hasSpecialChar) {
    return {
      isValid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { isValid: true, message: "Password is strong." };
}

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

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    registerNumber,
    department,
    courseType,
    programme,
    branch,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordCheck = isPasswordStrong(password);
    if (!passwordCheck.isValid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    await PendingUser.deleteMany({ email });

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const salt = crypto.randomBytes(16); // 128-bit salt
    const saltBase64 = salt.toString("base64");

    const newUser = new PendingUser({
      email,
      password: hashedPassword,
      registerNumber,
      department,
      courseType,
      programme,
      branch,
      encryptionSalt: saltBase64,
    });
    await newUser.save();

    const lastOtp = await Otp.findOne({ email }).sort({ createdAt: -1 }).exec();

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

    // Delete old OTPs
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

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration - OTP",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "OTP sent. Verify to complete registration." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
