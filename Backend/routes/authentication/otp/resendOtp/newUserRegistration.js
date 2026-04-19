import express from "express";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/pendingUser/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/resendOtp/newUserRegistration.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../../middleware/asyncHandler.js";
import { logInfo } from "../../../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/registration",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail } = req.body;

    const accountAccessCheck = await checkPendingUserAccess(userEmail);

    if (!accountAccessCheck.success) {
      return res.status(accountAccessCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: accountAccessCheck.responseDetails.code,
          message: accountAccessCheck.responseDetails.message,
          timestamp: accountAccessCheck.responseDetails.timestamp,
        },
      });
    }

    const otpGenerationPreCheck = await otpPreConditions(userEmail);

    if (!otpGenerationPreCheck.success) {
      return res.status(otpGenerationPreCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: otpGenerationPreCheck.responseDetails.code,
          message: otpGenerationPreCheck.responseDetails.message,
          timestamp: otpGenerationPreCheck.responseDetails.timestamp,
        },
      });
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

    const emailSubject = "AU Resume Builder resend OTP request";
    const emailHeading = `Use the below One Time Password to register your account.`;
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

    logInfo(
      "/resendOtp/newUser/registration",
      "REGISTRATION_OTP_RESENT",
      "Successfully resent otp to user email to complete registration",
      `email: ${userEmail}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "New OTP sent to email successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
