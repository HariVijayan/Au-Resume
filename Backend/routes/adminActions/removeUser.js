import express from "express";
import userDBModel from "../../models/user/user.js";
import resumeData from "../../models/pdf/resumeData.js";
import userOtp from "../../models/user/otp.js";
import userCurrentSession from "../../models/user/currentSession.js";
import pendingUser from "../../models/user/pendingUser.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/removeUser.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/removeUser",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      removalType,
      commonEmailSuffix,
      commonRegNoPrefix,
      commonRegNoStart,
      commonRegNoEnd,
      skipRegNo,
      userEmail,
      userRegNo,
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

    let finalUserList = [];
    let skippableRegNoList = csvToArray(skipRegNo);

    if (removalType === "Single") {
      const existingUser = await userDBModel.findOne({
        email: userEmail,
        registerNumber: userRegNo,
      });
      if (!existingUser) {
        logWarning(
        "/admin/actions/userMgmt/existingUser/removeUser",
        "INVALID_USER",
        "Failed to remove user. No such user found.",
        `email: ${userEmail} doesn't exist`,
      );
        throw new BadRequestError("User doesn't exist");
      }
      if (existingUser) {
        finalUserList.push({
          email: userEmail,
          registerNumber: userRegNo,
        });
      }
    } else if (removalType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;
        const existingUserRegNoEmail = `${regNo}${commonEmailSuffix}`;

        const existingUser = await userDBModel.findOne({
          email: existingUserRegNoEmail,
          registerNumber: regNo,
        });

        if (existingUser) {
          finalUserList.push({
            email: existingUserRegNoEmail,
            registerNumber: regNo,
          });
        }
      }
    }

    for (let i = 0; i < finalUserList.length; i++) {
      const userToDelete = finalUserList[i];
      const existingResume = await resumeData.find({
        login_email: userToDelete.email,
      });

      const pendingAccount = await pendingUser.find({
        email: userToDelete.email,
        registerNumber: userToDelete.registerNumber,
      });

      const existingOtps = await userOtp.find({
        email: userToDelete.email,
      });

      const existingSessions = await userCurrentSession.find({
        email: userToDelete.email,
      });

      if (existingSessions) {
        await userCurrentSession.deleteMany({
          email: userToDelete.email,
        });
      }

      if (existingOtps) {
        await userOtp.deleteMany({
          email: userToDelete.email,
        });
      }

      if (pendingAccount) {
        await pendingUser.deleteMany({
          email: userToDelete.email,
          registerNumber: userToDelete.registerNumber,
        });
      }

      if (existingResume) {
        await resumeData.deleteMany({
          login_email: userToDelete.email,
        });
      }

      await userDBModel.deleteMany({
        email: userToDelete.email,
        registerNumber: userToDelete.registerNumber,
      });
    }

    logInfo(
      "/admin/actions/userMgmt/existingUser/removeUser",
      "USER_REMOVAL_SUCCESS",
      "Users deleted successfully",
      `${finalUserList.length} users deleted`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: `${finalUserList.length} users deleted successfully`,
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
