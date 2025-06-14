import express from "express";
import adminUser from "../../../Login/Database_Models/adminUser.js";
import adminCurrentSession from "../../../Login/Database_Models/adminCurrentSession.js";
import adminOtp from "../../../Login/Database_Models/adminOtp.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

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

router.post("/get-approval-otp", async (req, res) => {
  const { requestType } = req.body;
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

    const lastOtp = await adminOtp
      .findOne({ adminEmail })
      .sort({ createdAt: -1 });

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

    await adminOtp.deleteMany({ email: adminEmail });

    let mailOptions;

    if (requestType === "addNewAdmin") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "New admin approval",
      });

      mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Admin - New Admin Approval OTP",
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      };
    } else {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "New admin approval",
      });

      mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Admin - New Admin Approval OTP",
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
