import express from "express";
import userDBModel from "../../models/user/user.js";
import resumeData from "../../models/pdf/resumeData.js";
import userOtp from "../../models/user/otp.js";
import userCurrentSession from "../../models/user/currentSession.js";
import pendingUser from "../../models/user/pendingUser.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/removeUser", async (req, res) => {
  const {
    opertationType,
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    skipRegNo,
    remUserEmail,
    remUserRegNo,
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

    if (opertationType === "Single") {
      const existingUser = await userDBModel.findOne({
        email: remUserEmail,
        registerNumber: remUserRegNo,
      });
      if (!existingUser) {
        return res.status(400).json({ message: "User doesn't exists." });
      }
      if (existingUser) {
        finalUserList.push({
          email: remUserEmail,
          registerNumber: remUserRegNo,
        });
      }
    } else if (opertationType === "Multiple") {
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

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Successfully removed ${finalUserList.length} users from ${commonRegNoPrefix} register number group.`
    );

    return res
      .status(200)
      .json({ message: `${finalUserList.length} users deleted successfully.` });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to remove user account. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
