import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import csvToArray from "../../helper/functions/csvToArray.js";

const router = express.Router();

router.post("/addNewUser", async (req, res) => {
  const {
    newAdditionType,
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    skipRegNo,
    commonUserDept,
    commonUserCourseType,
    commonUserProgramme,
    commonUserBranch,
    newUserEmail,
    newUserRegNo,
    newUserDept,
    newUserCourseType,
    newUserProgramme,
    newUserBranch,
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

    if (newAdditionType === "Single") {
      const newUser = await userDBModel.findOne({ email: newUserEmail });
      if (newUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      if (!newUser) {
        const newUserPassword = generatePassword();

        const hashedPassword = crypto
          .createHash("sha256")
          .update(newUserPassword)
          .digest("hex");

        const salt = crypto.randomBytes(16);
        const saltBase64 = salt.toString("base64");

        finalUserList.push({
          email: newUserEmail,
          password: hashedPassword,
          registerNumber: newUserRegNo,
          department: newUserDept,
          courseType: newUserCourseType,
          programme: newUserProgramme,
          branch: newUserBranch,
          encryptionSalt: saltBase64,
        });
        const emailSubject =
          "An admin has created your AU Resume Builder account";
        const emailHeading = `Your AU Resume Builder account is created.`;
        const emailBody = `${newUserPassword} is your login password. Use the forgot password option in the login page if you wish to change your password.`;

        const sendEmail = await sendEmailToUser(
          newUserEmail,
          emailSubject,
          emailHeading,
          emailBody
        );

        if (sendEmail.Success === "NO") {
          return res.status(sendEmail.HtmlCode).json({
            message:
              "User added. System errored while sending credentials. Delete account and add again",
          });
        }
      }
    } else if (newAdditionType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;
        const newUserRegNoEmail = `${regNo}${commonEmailSuffix}`;

        const newUser = await userDBModel.findOne({ email: newUserRegNoEmail });

        if (newUser) {
          return res.status(400).json({ message: "User already exists" });
        }

        if (!newUser) {
          const newUserPassword = generatePassword();

          const hashedPassword = crypto
            .createHash("sha256")
            .update(newUserPassword)
            .digest("hex");

          const salt = crypto.randomBytes(16);
          const saltBase64 = salt.toString("base64");

          finalUserList.push({
            email: newUserRegNoEmail,
            password: hashedPassword,
            registerNumber: regNo,
            department: commonUserDept,
            courseType: commonUserCourseType,
            programme: commonUserProgramme,
            branch: commonUserBranch,
            encryptionSalt: saltBase64,
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
