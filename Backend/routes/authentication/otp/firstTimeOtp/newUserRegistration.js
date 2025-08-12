import express from "express";
import User from "../../../../models/user/user.js";
import Otp from "../../../../models/user/otp.js";
import PendingUser from "../../../../models/user/pendingUser.js";
import crypto from "crypto";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import checkPassword from "../../../../helper/functions/checkPassword.js";
import addLogs from "../../../../helper/functions/addLogs.js";

const router = express.Router();

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

    const passwordCheck = checkPassword(password);
    if (!passwordCheck.Valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const lastOtp = await Otp.findOne({ email });

    if (
      lastOtp &&
      Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
    ) {
      return res
        .status(429)
        .json({ message: "Too many OTP requests. Try again in 1 minute" });
    }

    const requestNewOtp = await generateOtp(
      false,
      email,
      "New User Registration"
    );

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
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
      return res.status(sendEmail.HtmlCode).json({
        message: "Failed to send otp to user",
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

    await addLogs(
      false,
      false,
      email,
      email,
      "Public",
      "P4",
      `Account created. Yet to be verified.`
    );

    res.status(200).json({ message: "OTP sent to email successfully" });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to register pending user. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
