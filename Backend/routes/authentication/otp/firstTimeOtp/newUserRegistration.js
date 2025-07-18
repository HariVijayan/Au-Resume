import express from "express";
import User from "../../../../models/user/user.js";
import Otp from "../../../../models/user/otp.js";
import PendingUser from "../../../../models/user/pendingUser.js";
import crypto from "crypto";
import sendEmailToUser from "../../../components/sendEmail.js";
import generateOtp from "../../../components/generateOtp.js";

const router = express.Router();

const OTP_REQUEST_LIMIT = 60 * 1000; // 1 minute

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

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const passwordCheck = isPasswordStrong(password);
    if (!passwordCheck.isValid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const lastOtp = await Otp.findOne({ email });

    if (
      lastOtp &&
      Date.now() - lastOtp.createdAt.getTime() < OTP_REQUEST_LIMIT
    ) {
      return res
        .status(429)
        .json({ message: "Too many OTP requests. Try again in 1 minute." });
    }

    const requestNewOtp = await generateOtp(
      false,
      email,
      "New User Registration"
    );

    if (requestNewOtp.Success === "NO") {
      console.log(requestNewOtp.Reason);
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp, try again later.",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder new account registration";
    const emailHeading = `Use the below One Time Password to verify your email.`;
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

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

    res
      .status(201)
      .json({ message: "OTP sent. Verify to complete registration." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
