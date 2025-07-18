import express from "express";
import getAdminOtp from "../components/getAdminOtp.js";
import sendEmailToUser from "../components/sendEmail.js";
import generateOtp from "../components/generateOtp.js";

const router = express.Router();

router.post("/get-approval-otp", async (req, res) => {
  const { requestType } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await getAdminOtp(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    const adminEmail = adminCheck.AdminEmail;
    const adminAccount = adminCheck.AdminAccount;
    const adminName = adminAccount.name;

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
      console.log(requestNewOtp.Reason);
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp, try again later.",
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
      console.log(sendEmail.Reason);
      return res.status(sendEmail.HtmlCode).json({
        message: "Unable to send approval otp, try again later.",
      });
    }

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
