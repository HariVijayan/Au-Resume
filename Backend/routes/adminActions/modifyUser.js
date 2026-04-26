import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/modifyUser.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/modifyUser",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      userEmail,
      userRegNo,
      passwordResetNeeded,
      accountUnlockNeeded,
      otpInput,
    } = req.body;
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (!adminAccessCheck.success) {
      return res.status(adminAccessCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: adminAccessCheck.responseDetails.code,
          message: adminAccessCheck.responseDetails.message,
          timestamp: adminAccessCheck.responseDetails.timestamp,
        },
      });
    }
    const adminEmail = adminAccessCheck.otherData.AdminEmail;

    const adminOtpVerification = await verifyAdminOtp(adminEmail, otpInput);

    if (!adminOtpVerification.success) {
      return res.status(adminOtpVerification.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: adminOtpVerification.responseDetails.code,
          message: adminOtpVerification.responseDetails.message,
          timestamp: adminOtpVerification.responseDetails.timestamp,
        },
      });
    }

    const modifiableUser = await userDBModel.findOne({
      email: userEmail,
      registerNumber: userRegNo,
    });

    if (!modifiableUser) {
      logWarning(
        "/admin/actions/userMgmt/modifyAccount/modifyUser",
        "INVALID_USER",
        "No such user found",
        `email: ${userEmail} doesn't exist`,
      );
      throw new BadRequestError("No such user found");
    }

    if (accountUnlockNeeded) {
      await userDBModel.updateOne(
        { email: userEmail },
        {
          $set: {
            failedLoginAttempts: 0,
            lockUntil: null,
            lockUntilFormatted: null,
          },
        },
      );
    }

    if (passwordResetNeeded) {
      const newUserPassword = generatePassword();
      const hashedPassword = crypto
        .createHash("sha256")
        .update(newUserPassword)
        .digest("hex");
      await userDBModel.updateOne(
        { email: userEmail },
        {
          $set: {
            password: hashedPassword,
          },
        },
      );

      const emailSubject = "AU Resume Builder account password reset";
      const emailHeading = `Your account's password has been reset by an admin.`;
      const emailBody = `${newUserPassword} is your new password. Use the forgot password option in the login page if you wish to change your password.`;

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
            message: "Failed to send new password to the user",
            timestamp: sendEmail.responseDetails.timestamp,
          },
        });
      }
    }

    logInfo(
      "/admin/actions/userMgmt/modifyAccount/modifyUser",
      "USER_MODIFICATION_SUCCESS",
      "User account modified successfully",
      `email: ${userEmail} modified successfully`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "User account modified successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
