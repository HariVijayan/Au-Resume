import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import otpPreConditions from "../../helper/authentication/admin/otpPreConditions.js";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generateOtp from "../../helper/functions/generateOtp.js";

const router = express.Router();

router.post("/get-approval-otp", async (req, res) => {
  const { requestType } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;
    const adminAccount = adminAccessCheck.AdminAccount;
    const adminName = adminAccount.name;

    const otpGenerationPreCheck = await otpPreConditions(adminEmail);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    let otpReason = "";

    if (requestType === "addNewAdmin") {
      otpReason = "Add a new admin";
    } else if (requestType === "removeAdmin") {
      otpReason = "Remove existing admin";
    } else if (requestType === "modifyAdminType") {
      otpReason = "Modify existing admin";
    } else {
      otpReason = "Admin Portal Action";
    }

    const requestNewOtp = await generateOtp(true, adminEmail, otpReason);

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder Admin Portal OTP";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;
    let emailHeading = "";

    if (requestType === "addNewAdmin") {
      emailHeading = `Hi ${adminName}, use the below One Time Password to approve the new admin account.`;
    } else if (requestType === "removeAdmin") {
      emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account removal.`;
    } else if (requestType === "modifyAdminType") {
      emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account modification.`;
    } else {
      emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin portal action.`;
    }

    const sendEmail = await sendEmailToUser(
      adminEmail,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Unable to send approval otp",
      });
    }

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
