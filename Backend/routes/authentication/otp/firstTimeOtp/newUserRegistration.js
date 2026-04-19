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
import BadRequestError from "../../../../middleware/httpStatusCodes/badRequest.js";
import TooManyRequestsError from "../../../../middleware/httpStatusCodes/tooManyRequests.js";
import asyncHandler from "../../../../middleware/asyncHandler.js";
import {
  logWarning,
  logInfo,
} from "../../../../helper/functions/systemLogger.js";

const router = express.Router();

const BCRYPT_COST_FACTOR = 12;

router.post(
  "/register",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      userEmail,
      userPassword,
      userRegNo,
      userDept,
      userCourseType,
      userProgramme,
      userBranch,
    } = req.body;

    const existingUser = await User.findOne({ email: userEmail });
    if (existingUser) {
      logWarning(
        "/createUser/register",
        "EXISTING_USER",
        "Registration attempt for existing user email",
        `email: ${userEmail}`,
      );
      throw new BadRequestError("Email already exists");
    }

    const passwordCheck = checkPassword(userPassword);
    if (!passwordCheck.success) {
      return res.status(passwordCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: passwordCheck.responseDetails.code,
          message: passwordCheck.responseDetails.message,
          timestamp: passwordCheck.responseDetails.timestamp,
        },
      });
    }

    const lastOtp = await Otp.findOne({ email: userEmail });

    if (
      lastOtp &&
      Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
    ) {
      logWarning(
        "/createUser/register",
        "TOO_MANY_OTP_REQUESTS",
        "User requested too many otp's",
        `email: ${userEmail}`,
      );
      throw new TooManyRequestsError(
        "Too many OTP requests. Try again in 1 minute",
      );
    }

    const requestNewOtp = await generateOtp(
      false,
      userEmail,
      "New User Registration",
    );

    if (!requestNewOtp.success) {
      return res.status(requestNewOtp.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: requestNewOtp.responseDetails.code,
          message: "Unable to generate otp",
          timestamp: requestNewOtp.responseDetails.timestamp,
        },
      });
    }

    const newOtp = requestNewOtp.otherData.NewOtp;

    const emailSubject = "AU Resume Builder new account registration";
    const emailHeading = `Use the below One Time Password to verify your email.`;
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      userEmail,
      emailSubject,
      emailHeading,
      emailBody,
    );

    if (!sendEmail.success) {
      return res.status(sendEmail.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: sendEmail.responseDetails.code,
          message: "Error while sending otp email to user",
          timestamp: sendEmail.responseDetails.timestamp,
        },
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

    logInfo(
      "/createUser/register",
      "REGISTRATION_OTP_SENT",
      "Successfully sent otp to user email to complete registration",
      `email: ${userEmail}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "OTP sent to email successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
