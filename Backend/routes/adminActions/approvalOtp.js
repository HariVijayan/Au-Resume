import express from "express";
import adminOtp from "../../models/admin/otp.js";
import nodemailer from "nodemailer";
import getAdminOtp from "../components/getAdminOtp.js";

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
    const adminCheck = await getAdminOtp(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    const adminEmail = adminCheck.AdminEmail;

    const otp = generateStrongOtp(6);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

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
    } else if (requestType === "removeAdmin") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Removing admin approval",
      });

      mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Admin - Remove Admin Approval OTP",
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
      };
    } else if (requestType === "modifyAdminType") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Modifying admin approval",
      });

      mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Admin - Modify Admin Approval OTP",
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
        otpFor: "Admin Management Action approval",
      });

      mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "Admin - Admin Management Action Approval OTP",
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
