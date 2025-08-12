import express from "express";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import addLogs from "../../../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, isAdmin } = req.body;
  try {
    const accountAccessCheck = await checkUserOrAdminAccess(email, isAdmin);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpGenerationPreCheck = await otpPreConditions(email, isAdmin);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    const requestNewOtp = await generateOtp(isAdmin, email, "Password Reset");

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    let emailSubject = "";

    if (isAdmin) {
      emailSubject = "AU Resume Builder admin account resend OTP request";
    } else {
      emailSubject = "AU Resume Builder account resend OTP request";
    }

    const emailHeading =
      "Use the below One Time Password to reset your account's password";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      email,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Failed to send otp to user",
      });
    }

    await addLogs(
      false,
      false,
      email,
      email,
      "Public",
      "P4",
      `Requested otp resending for password reset.`
    );

    res.json({ message: "New OTP sent to email successfully" });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to resend otp for password reset. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
