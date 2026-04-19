import express from "express";
import User from "../../../models/user/user.js";
import adminUser from "../../../models/admin/admin.js";
import checkPassword from "../../../helper/functions/checkPassword.js";
import resumeData from "../../../models/pdf/resumeData.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import bcrypt from "bcrypt";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/userActions/passwordReset.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

const BCRYPT_COST_FACTOR = 12;

router.post(
  "/reset-password",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, newPassword, isAdmin } = req.body;
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

    if (isAdmin) {
      await adminUser.updateOne(
        { email: userEmail },
        { password: hashedPassword },
      );
    } else {
      await resumeData.deleteMany({ login_email: userEmail });
      await userCurrentSession.deleteMany({ email: userEmail });
      await User.updateOne({ email: userEmail }, { password: hashedPassword });
    }

    logInfo(
      "/userRequest/reset-password",
      "PWD_RESET_SUCCESS",
      "Successfully reset user's password from login page",
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
