import express from "express";
import adminUser from "../../models/admin/admin.js";
import crypto from "crypto";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/addAdmin.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/newAdmin",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { adminName, adminEmail, adminType, otpInput } = req.body;

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

      const newAdminPassword = generatePassword();

      const hashedPassword = crypto
        .createHash("sha256")
        .update(newAdminPassword)
        .digest("hex");

      const newAdmin = new adminUser({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        createdBy: approvingAdminEmail,
        accountType: adminType,
      });
      await newAdmin.save();

      const emailSubject = "You've been added as an admin to AU Resume Builder";
      const emailHeading = `Hi ${adminName}, your admin account is created in Au Resume Builder.`;
      const emailBody = `${newAdminPassword} is your login password. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody,
      );

      if (sendEmail.Success === "NO") {
        return res.status(sendEmail.HtmlCode).json({
          message:
            "Admin added. System errored while sending credentials. Delete account and add again",
        });
      }
      res.json({
        message: "New admin added successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
