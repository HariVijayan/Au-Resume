import express from "express";
import Otp from "../../../../models/user/otp.js";
import adminOtp from "../../../../models/admin/otp.js";
import getUserOrAdminOtp from "../../../components/getUserOrAdminOtp.js";
import sendEmailToUser from "../../../components/sendEmail.js";

const router = express.Router();

const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

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

  try {
    const accountCheck = await getUserOrAdminOtp(email, isAdmin);
    if (accountCheck.Valid === "NO") {
      return res
        .status(accountCheck.HtmlCode)
        .json({ message: accountCheck.Reason });
    }

    const otp = generateStrongOtp(6);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

    if (isAdmin) {
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

    let emailSubject = "";

    if (isAdmin) {
      emailSubject = "AU Resume Builder admin account password reset OTP";
    } else {
      emailSubject = "AU Resume Builder account password reset OTP";
    }

    const emailHeading =
      "Use the below One Time Password to reset your account's password";
    const emailBody = `${otp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      email,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      console.log(sendEmail.Reason);
      return res.status(sendEmail.HtmlCode).json({
        message: "Please restart the process.",
      });
    }

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
