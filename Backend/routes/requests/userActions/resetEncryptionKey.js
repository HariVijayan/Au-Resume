import express from "express";
import User from "../../../models/user/user.js";
import crypto from "crypto";
import resumeData from "../../../models/pdf/resumeData.js";
import verifyUserOrAdminOtp from "../../../helper/authentication/userOrAdmin/verifyOtp.js";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/userActions/resetEncryptionKey.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/resetEncKey",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, otpInput } = req.body;
    const otpVerification = await verifyUserOrAdminOtp(
      userEmail,
      false,
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

    const salt = crypto.randomBytes(16);
    const saltBase64 = salt.toString("base64");

    await resumeData.deleteMany({ login_email: userEmail });

    await User.updateOne({ email: userEmail }, { encryptionSalt: saltBase64 });

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Encryption Key has been successfully reset",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
