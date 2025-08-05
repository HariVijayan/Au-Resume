import express from "express";
import checkUserAccess from "../../../helper/authentication/userOrAdmin/checkUserAccess.js";
import otpPreConditions from "../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../helper/functions/sendEmail.js";
import generateOtp from "../../../helper/functions/generateOtp.js";
import addLogs from "../../../helper/functions/addLogs.js";
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

    if (requestType === "PasswordReset") {
      const passwordCheck = checkPassword(newPassword);
      if (!passwordCheck.Valid) {
        return res.status(400).json({ message: passwordCheck.message });
      }
      otpReason = "Reset password from profile";
    } else if (requestType === "GetLogs") {
      otpReason = "Get user logs from profile";
    } else if (requestType === "EncryptionKeyReset") {
      otpReason = "Reset encryption key from profile";
    } else {
      otpReason = "User Profile Action";
    }

    const requestNewOtp = await generateOtp(false, userEmail, otpReason);

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp, try again later.",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder User Profile OTP";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;
    let emailHeading = "";

    if (requestType === "PasswordReset") {
      emailHeading = `Use the below One Time Password to reset the password for your account.`;
    } else if (requestType === "GetLogs") {
      emailHeading = `Use the below One Time Password to verify your identity for getting logs of your account.`;
    } else if (requestType === "EncryptionKeyReset") {
      emailHeading = `Use the below One Time Password to reset the encryption key for your account.`;
    } else {
      emailHeading = `Use the below One Time Password to approve the user profile action.`;
    }

    const sendEmail = await sendEmailToUser(
      userEmail,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Unable to send approval otp, try again later.",
      });
    }

    res.json({
      message: "An OTP has been sent to your email. Kindly verify to proceed.",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to send Otp for user profile action. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
