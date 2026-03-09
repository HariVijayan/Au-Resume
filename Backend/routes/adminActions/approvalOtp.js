import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import otpPreConditions from "../../helper/authentication/admin/otpPreConditions.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generateOtp from "../../helper/functions/generateOtp.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/approvalOtp.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/get-approval-otp",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { requestType } = req.body;

    try {
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

      const adminEmail = adminAccessCheck.AdminEmail;
      const adminAccount = adminAccessCheck.AdminAccount;
      const adminName = adminAccount.name;

      const otpGenerationPreCheck = await otpPreConditions(adminEmail);

      if (!otpGenerationPreCheck.success) {
        return res
          .status(otpGenerationPreCheck.responseDetails.statusCode)
          .json({
            success: false,
            responseDetails: {
              code: otpGenerationPreCheck.responseDetails.code,
              message: otpGenerationPreCheck.responseDetails.message,
              timestamp: otpGenerationPreCheck.responseDetails.timestamp,
            },
          });
      }

      let otpReason = "";

      if (requestType === "Add Admin") {
        otpReason = "Add a new admin";
      } else if (requestType === "Remove Admin") {
        otpReason = "Remove existing admin";
      } else if (requestType === "Modify Admin") {
        otpReason = "Modify existing admin";
      } else {
        otpReason = "Admin Portal Action";
      }

      const requestNewOtp = await generateOtp(true, adminEmail, otpReason);

      if (!requestNewOtp.success) {
        return res.status(requestNewOtp.responseDetails.statusCode).json({
          success: false,
          responseDetails: {
            code: requestNewOtp.responseDetails.code,
            message: "Error while generating otp",
            timestamp: requestNewOtp.responseDetails.timestamp,
          },
        });
      }

      const newOtp = requestNewOtp.NewOtp;

      const emailSubject = "AU Resume Builder Admin Portal OTP";
      const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;
      let emailHeading = "";

      if (requestType === "Add Admin") {
        emailHeading = `Hi ${adminName}, use the below One Time Password to approve the new admin account.`;
      } else if (requestType === "Remove Admin") {
        emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account removal.`;
      } else if (requestType === "Modify Admin") {
        emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account modification.`;
      } else {
        emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin portal action.`;
      }

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
            message: "Unable to email approval otp",
            timestamp: sendEmail.responseDetails.timestamp,
          },
        });
      }

      res.json({ message: "OTP sent to email" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
