import express from "express";
import User from "../../../../models/user/user.js";
import Otp from "../../../../models/user/otp.js";
import PendingUser from "../../../../models/user/pendingUser.js";
import crypto from "crypto";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import checkPassword from "../../../../helper/functions/checkPassword.js";
import bcrypt from "bcrypt";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/firstTimeOtp/newUserRegistration.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";

const router = express.Router();

const BCRYPT_COST_FACTOR = 12;

router.post(
  "/register",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const {
      userEmail,
      userPassword,
      userRegNo,
      userDept,
      userCourseType,
      userProgramme,
      userBranch,
    } = req.body;

    try {
      const existingUser = await User.findOne({ email: userEmail });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const passwordCheck = checkPassword(userPassword);
      if (!passwordCheck.Valid) {
        return res.status(400).json({ message: passwordCheck.message });
      }

      const lastOtp = await Otp.findOne({ email: userEmail });

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
        userEmail,
        "New User Registration",
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
        userEmail,
        emailSubject,
        emailHeading,
        emailBody,
      );

      if (sendEmail.Success === "NO") {
        return res.status(sendEmail.HtmlCode).json({
          message: "Failed to send otp to user",
        });
      }

      await PendingUser.deleteMany({ email: userEmail });

      const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
      const hashedPassword = await bcrypt.hash(userPassword, salt);

      const resumeEncryptionSalt = crypto.randomBytes(16); // 128-bit salt
      const saltBase64 = resumeEncryptionSalt.toString("base64");

      const newUser = new PendingUser({
        email: userEmail,
        password: hashedPassword,
        registerNumber: userRegNo,
        department: userDept,
        courseType: userCourseType,
        programme: userProgramme,
        branch: userBranch,
        resumeEncryptionSalt: saltBase64,
      });
      await newUser.save();

      res.status(200).json({ message: "OTP sent to email successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
