import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import bcrypt from "bcrypt";

const BCRYPT_COST_FACTOR = 12;

const router = express.Router();

router.post("/addNewUser", async (req, res) => {
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

    if (additionType === "Single") {
      const newUser = await userDBModel.findOne({ email: userEmail });
      if (newUser) {
        return res.status(400).json({ message: "User already exists" });
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

        if (sendEmail.Success === "NO") {
          return res.status(sendEmail.HtmlCode).json({
            message:
              "User added. System errored while sending credentials. Delete account and add again",
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
          return res.status(400).json({ message: "User already exists" });
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
    return res
      .status(200)
      .json({ message: `${result.length} users inserted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
