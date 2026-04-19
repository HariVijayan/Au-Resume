import express from "express";
import User from "../../../models/user/user.js";
import checkPassword from "../../../helper/functions/checkPassword.js";
import resumeData from "../../../models/pdf/resumeData.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import verifyUserOrAdminOtp from "../../../helper/authentication/userOrAdmin/verifyOtp.js";
import bcrypt from "bcrypt";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/userActions/resetPasswordWithRecords.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

const BCRYPT_COST_FACTOR = 12;

router.post(
  "/resetPassword",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, newPassword, otpInput } = req.body;
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

    const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await resumeData.deleteMany({ login_email: userEmail });

    await userCurrentSession.deleteMany({ email: userEmail });

    await User.updateOne({ email: userEmail }, { password: hashedPassword });

    logInfo(
      "/user/passwordAction/resetPassword",
      "PWD_RESET_SUCCESS",
      "Successfully reset user's password from user profile page",
      `email:  ${userEmail}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Password updated successfully. Redirecting to login page",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
