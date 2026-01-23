import express from "express";
import adminUser from "../../models/admin/admin.js";
import crypto from "crypto";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/modifyAdmin.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/admin-modifications",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
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

    try {
      const accessToken = req.cookies.accessToken;

      const adminAccessCheck = await checkAdminAccess(accessToken);
      if (adminAccessCheck.Valid === "NO") {
        return res
          .status(adminAccessCheck.HtmlCode)
          .json({ message: adminAccessCheck.Reason });
      }

      const approvingAdminEmail = adminAccessCheck.AdminEmail;

      const adminOtpVerification = await verifyAdminOtp(
        approvingAdminEmail,
        otpInput,
      );

      if (adminOtpVerification.Valid === "NO") {
        return res
          .status(adminOtpVerification.HtmlCode)
          .json({ message: adminOtpVerification.Reason });
      }

      let adminToBeModified = await adminUser.findOne({
        email: adminEmail,
        accountType: currentAdminType,
      });

      if (!adminToBeModified) {
        return res.status(400).json({ message: "No such admin found" });
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

        if (sendEmail.Success === "NO") {
          return res.status(sendEmail.HtmlCode).json({
            message: "Failed to send new password to the admin",
          });
        }
      }

      if (adminTypeChangeNeeded) {
        adminToBeModified = await adminUser.findOne({
          email: adminEmail,
          accountType: newAdminType,
        });

        if (adminToBeModified) {
          return res.status(400).json({
            message: "The mentioned admin already has the provided access type",
          });
        }

        await adminUser.updateOne(
          { email: adminEmail },
          { $set: { accountType: newAdminType } },
        );
      }

      res.status(200).json({
        message: "Admin modified successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
