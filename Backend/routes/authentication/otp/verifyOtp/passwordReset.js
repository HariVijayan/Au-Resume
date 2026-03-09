import express from "express";
import verifyUserOrAdminOtp from "../../../../helper/authentication/userOrAdmin/verifyOtp.js";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/verifyOtp/passwordReset.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/forgot-password",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { userEmail, isAdmin, otpInput } = req.body;

    try {
      const accountAccessCheck = await checkUserOrAdminAccess(
        userEmail,
        isAdmin,
      );
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

      res.json({
        message:
          "OTP verified successfully. Redirecting to password reset page",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
