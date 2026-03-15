import express from "express";
import checkUserAccess from "../../../helper/authentication/userOrAdmin/checkUserAccess.js";
import otpPreConditions from "../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../helper/functions/sendEmail.js";
import generateOtp from "../../../helper/functions/generateOtp.js";
import checkPassword from "../../../helper/functions/checkPassword.js";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/userActions/approvalOtp.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/getApprovalOtp",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { requestType, newPassword } = req.body;

    const accessToken = req.cookies.accessToken;

    const userAccessCheck = await checkUserAccess(accessToken);

    if (!userAccessCheck.success) {
      return res.status(userAccessCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: userAccessCheck.responseDetails.code,
          message: userAccessCheck.responseDetails.message,
          timestamp: userAccessCheck.responseDetails.timestamp,
        },
      });
    }

    const userEmail = userAccessCheck.otherData.UserEmail;

    const otpGenerationPreCheck = await otpPreConditions(userEmail, false);

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

    let otpReason = "";

    if (requestType === "Password Reset") {
      const passwordCheck = checkPassword(newPassword);
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
      otpReason = "Reset password from profile";
    } else if (requestType === "Get Logs") {
      otpReason = "Get user logs from profile";
    } else if (requestType === "Encryption Key Reset") {
      otpReason = "Reset encryption key from profile";
    } else {
      otpReason = "User Profile Action";
    }

    const requestNewOtp = await generateOtp(false, userEmail, otpReason);

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

    const emailSubject = "AU Resume Builder User Profile OTP";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;
    let emailHeading = "";

    if (requestType === "Password Reset") {
      emailHeading = `Use the below One Time Password to reset the password for your account.`;
    } else if (requestType === "Get Logs") {
      emailHeading = `Use the below One Time Password to verify your identity for getting logs of your account.`;
    } else if (requestType === "Encryption Key Reset") {
      emailHeading = `Use the below One Time Password to reset the encryption key for your account.`;
    } else {
      emailHeading = `Use the below One Time Password to approve the user profile action.`;
    }

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
          message: "Error while sending approval otp email to user",
          timestamp: sendEmail.responseDetails.timestamp,
        },
      });
    }

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Otp sent to email successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
