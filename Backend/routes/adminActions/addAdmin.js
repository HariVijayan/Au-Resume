import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

const generateStrongPassword = (length = 8) => {
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

router.post("/newAdmin", async (req, res) => {
  const { newAdminName, newAdminEmail, adminType, otpInput } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const session = await adminCurrentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    const adminEmail = session.email;

    const user = await adminUser.findOne({ email: adminEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
    }

    const storedOtp = await adminOtp.findOne({
      email: adminEmail,
      otp: otpInput,
    });

    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      await adminOtp.deleteMany({ adminEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    const newAdminPassword = generateStrongPassword(8);
    const createdAt = new Date(Date.now());

    const hashedPassword = crypto
      .createHash("sha256")
      .update(newAdminPassword)
      .digest("hex");

    const newAdmin = new adminUser({
      name: newAdminName,
      email: newAdminEmail,
      password: hashedPassword,
      createdAt,
      createdAtFormatted: formatISTTimestamp(createdAt),
      createdBy: adminEmail,
      accountType: adminType,
    });
    await newAdmin.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: newAdminEmail,
      subject: "You've been added as an admin to AU Resume Builder",
      text: `Your login password is: ${newAdminPassword}. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`,
    };

    await transporter.sendMail(mailOptions);

    await adminOtp.deleteMany({ email: adminEmail });

    res.json({
      message: "New admin added successfully.",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
