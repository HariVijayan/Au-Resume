import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/modifyUser", async (req, res) => {
  const {
    modifyUserEmail,
    modifyUserRegNo,
    passwordReset,
    accountUnlock,
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

    const modifiableUser = await userDBModel.findOne({
      email: modifyUserEmail,
      registerNumber: modifyUserRegNo,
    });

    if (!modifiableUser) {
      return res.status(400).json({ message: "No such user found." });
    }

    if (accountUnlock) {
      await userDBModel.updateOne(
        { email: modifyUserEmail },
        {
          $set: {
            failedLoginAttempts: 0,
            lockUntil: null,
            lockUntilFormatted: null,
          },
        }
      );
    }

    if (passwordReset) {
      const newUserPassword = generatePassword();
      const hashedPassword = crypto
        .createHash("sha256")
        .update(newUserPassword)
        .digest("hex");
      await userDBModel.updateOne(
        { email: modifyUserEmail },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      const emailSubject = "AU Resume Builder account password reset";
      const emailHeading = `Your account's password has been reset by an admin.`;
      const emailBody = `${newUserPassword} is your new password. Use the forgot password option in the login page if you wish to change your password.`;

      const sendEmail = await sendEmailToUser(
        modifyUserEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message:
            "Failed to send new password to the user. Please restart the process.",
        });
      }
    }

    res.status(200).json({
      message: "User account modified successfully.",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to modify user account. ${error}`
    );
    res.status(500).json({ message: `Server error` });
  }
});

export default router;
