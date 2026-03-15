import express from "express";
import verifyUserOrAdminOtp from "../../../../helper/authentication/userOrAdmin/verifyOtp.js";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/verifyOtp/passwordReset.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/forgot-password",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, isAdmin, otpInput } = req.body;

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

    const otpVerification = await verifyUserOrAdminOtp(
      userEmail,
      isAdmin,
      otpInput,
    );

    if (!otpVerification.success) {
      return res.status(otpVerification.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: otpVerification.responseDetails.code,
          message: otpVerification.responseDetails.message,
          timestamp: otpVerification.responseDetails.timestamp,
        },
      });
    }

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message:
          "OTP verified successfully. Redirecting to password reset page",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
