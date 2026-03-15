import express from "express";
import adminUser from "../../models/admin/admin.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/modifyAdmin.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/admin-modifications",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      adminEmail,
      currentAdminType,
      nameChangeNeeded,
      adminTypeChangeNeeded,
      passwordResetNeeded,
      accountUnlockNeeded,
      newAdminName,
      newAdminType,
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

    const approvingAdminEmail = adminAccessCheck.otherData.AdminEmail;

    const adminOtpVerification = await verifyAdminOtp(
      approvingAdminEmail,
      otpInput,
    );

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

    let adminToBeModified = await adminUser.findOne({
      email: adminEmail,
      accountType: currentAdminType,
    });

    if (!adminToBeModified) {
      throw new BadRequestError("No such admin found");
    }

    if (nameChangeNeeded) {
      await adminUser.updateOne(
        { email: adminEmail },
        { $set: { name: newAdminName } },
      );
    }

    if (accountUnlockNeeded) {
      await adminUser.updateOne(
        { email: adminEmail },
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
      const newAdminPassword = generatePassword();
      const hashedPassword = crypto
        .createHash("sha256")
        .update(newAdminPassword)
        .digest("hex");
      await adminUser.updateOne(
        { email: adminEmail },
        {
          $set: {
            password: hashedPassword,
          },
        },
      );

      const emailSubject =
        "An admin has initiated a password reset for your AU Resume Builder account";
      const emailHeading = `Hi ${adminToBeModified.name}, your admin account's password has been reset.`;
      const emailBody = `${newAdminPassword} is your new password. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody,
      );

      if (!sendEmail.success) {
        return res.status(sendEmail.responseDetails.statusCode).json({
          success: false,
          responseDetails: {
            code: sendEmail.responseDetails.code,
            message: "Failed to send new password to the admin",
            timestamp: sendEmail.responseDetails.timestamp,
          },
        });
      }
    }

    if (adminTypeChangeNeeded) {
      adminToBeModified = await adminUser.findOne({
        email: adminEmail,
        accountType: newAdminType,
      });

      if (adminToBeModified) {
        throw new BadRequestError(
          "The mentioned admin already has the provided access type",
        );
      }

      await adminUser.updateOne(
        { email: adminEmail },
        { $set: { accountType: newAdminType } },
      );
    }

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Admin modified successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
