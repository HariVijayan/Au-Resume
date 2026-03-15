import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import bcrypt from "bcrypt";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/addUser.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const BCRYPT_COST_FACTOR = 12;

const router = express.Router();

router.post(
  "/addNewUser",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      additionType,
      commonEmailSuffix,
      commonRegNoPrefix,
      commonRegNoStart,
      commonRegNoEnd,
      skipRegNo,
      commonUserDept,
      commonUserCourseType,
      commonUserProgramme,
      commonUserBranch,
      userEmail,
      userRegNo,
      userDept,
      userCourseType,
      userProgramme,
      userBranch,
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

    if (additionType === "Single") {
      const newUser = await userDBModel.findOne({ email: userEmail });
      if (newUser) {
        throw new BadRequestError("User already exists");
      }
      if (!newUser) {
        const newUserPassword = generatePassword();

        const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
        const hashedPassword = await bcrypt.hash(newUserPassword, salt);

        const resumeEncryptionSalt = crypto.randomBytes(16);
        const saltBase64 = resumeEncryptionSalt.toString("base64");

        finalUserList.push({
          email: userEmail,
          password: hashedPassword,
          registerNumber: userRegNo,
          department: userDept,
          courseType: userCourseType,
          programme: userProgramme,
          branch: userBranch,
          resumeEncryptionSalt: saltBase64,
        });
        const emailSubject =
          "An admin has created your AU Resume Builder account";
        const emailHeading = `Your AU Resume Builder account is created.`;
        const emailBody = `${newUserPassword} is your login password. Use the forgot password option in the login page if you wish to change your password.`;

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
              message:
                "User added. System errored while sending credentials. Delete account and add again",
              timestamp: sendEmail.responseDetails.timestamp,
            },
          });
        }
      }
    } else if (additionType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;
        const regNoAddedEmail = `${regNo}${commonEmailSuffix}`;

        const newUser = await userDBModel.findOne({ email: regNoAddedEmail });

        if (newUser) {
          throw new BadRequestError("User already exists");
        }

        if (!newUser) {
          const newUserPassword = generatePassword();

          const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
          const hashedPassword = await bcrypt.hash(newUserPassword, salt);

          const resumeEncryptionSalt = crypto.randomBytes(16);
          const saltBase64 = resumeEncryptionSalt.toString("base64");

          finalUserList.push({
            email: regNoAddedEmail,
            password: hashedPassword,
            registerNumber: regNo,
            department: commonUserDept,
            courseType: commonUserCourseType,
            programme: commonUserProgramme,
            branch: commonUserBranch,
            resumeEncryptionSalt: saltBase64,
          });
        }
      }
    }

    const result = await userDBModel.insertMany(finalUserList);
    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: `${result.length} users inserted successfully`,
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
