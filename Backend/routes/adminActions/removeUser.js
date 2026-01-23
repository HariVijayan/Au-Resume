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

const router = express.Router();

router.post(
  "/removeUser",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
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

    try {
      const accessToken = req.cookies.accessToken;

      const adminAccessCheck = await checkAdminAccess(accessToken);
      if (adminAccessCheck.Valid === "NO") {
        return res
          .status(adminAccessCheck.HtmlCode)
          .json({ message: adminAccessCheck.Reason });
      }

      const adminEmail = adminAccessCheck.AdminEmail;

      const adminOtpVerification = await verifyAdminOtp(adminEmail, otpInput);

      if (adminOtpVerification.Valid === "NO") {
        return res
          .status(adminOtpVerification.HtmlCode)
          .json({ message: adminOtpVerification.Reason });
      }

      let finalUserList = [];
      let skippableRegNoList = csvToArray(skipRegNo);

      if (removalType === "Single") {
        const existingUser = await userDBModel.findOne({
          email: userEmail,
          registerNumber: userRegNo,
        });
        if (!existingUser) {
          return res.status(400).json({ message: "User doesn't exist" });
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

      return res
        .status(200)
        .json({
          message: `${finalUserList.length} users deleted successfully`,
        });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
