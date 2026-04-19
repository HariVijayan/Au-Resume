import express from "express";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/firstTimeOtp/passwordReset.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../../middleware/asyncHandler.js";
import { logInfo } from "../../../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/password-reset-otp",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, isAdmin } = req.body;

    const accountAccessCheck = await checkUserOrAdminAccess(userEmail, isAdmin);

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

    const otpGenerationPreCheck = await otpPreConditions(userEmail, isAdmin);

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
      isAdmin,
      userEmail,
      "Password Reset",
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

    let emailSubject = "";

    if (isAdmin) {
      emailSubject = "AU Resume Builder admin account password reset OTP";
    } else {
      emailSubject = "AU Resume Builder account password reset OTP";
    }

    const emailHeading =
      "Use the below One Time Password to reset your account's password";
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
      "/getFirstOtp/password-reset-otp",
      "PWD_RESET_OTP_SENT",
      "Successful sent otp to user email to complete password reset",
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
