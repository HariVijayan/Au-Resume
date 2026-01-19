import express from "express";
import checkUserAccess from "../../../helper/authentication/userOrAdmin/checkUserAccess.js";
import otpPreConditions from "../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../helper/functions/sendEmail.js";
import generateOtp from "../../../helper/functions/generateOtp.js";
import checkPassword from "../../../helper/functions/checkPassword.js";

const router = express.Router();

router.post("/getApprovalOtp", async (req, res) => {
  const { requestType, newPassword } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const userAccessCheck = await checkUserAccess(accessToken);
    if (userAccessCheck.Valid === "NO") {
      return res
        .status(userAccessCheck.HtmlCode)
        .json({ message: userAccessCheck.Reason });
    }

    const userEmail = userAccessCheck.UserEmail;

    const otpGenerationPreCheck = await otpPreConditions(userEmail, false);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    let otpReason = "";

    if (requestType === "Password Reset") {
      const passwordCheck = checkPassword(newPassword);
      if (!passwordCheck.Valid) {
        return res.status(400).json({ message: passwordCheck.message });
      }
      otpReason = "Reset password from profile";
    } else if (requestType === "Get Logs") {
      otpReason = "Get user logs from profile";
    } else if (requestType === "Encryption Key Reset") {
      otpReason = "Reset encryption key from profile";
    } else {
      otpReason = "User Profile Action";
    }

    const requestNewOtp = await generateOtp(false, userEmail, otpReason);

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder User Profile OTP";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;
    let emailHeading = "";

    if (requestType === "Password Reset") {
      emailHeading = `Use the below One Time Password to reset the password for your account.`;
    } else if (requestType === "Get Logs") {
      emailHeading = `Use the below One Time Password to verify your identity for getting logs of your account.`;
    } else if (requestType === "Encryption Key Reset") {
      emailHeading = `Use the below One Time Password to reset the encryption key for your account.`;
    } else {
      emailHeading = `Use the below One Time Password to approve the user profile action.`;
    }

    const sendEmail = await sendEmailToUser(
      userEmail,
      emailSubject,
      emailHeading,
      emailBody,
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Unable to send approval otp",
      });
    }

    res.json({
      message: "An OTP has been sent to your email",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
