import express from "express";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/userOrAdmin/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";

const router = express.Router();

router.post("/password-reset-otp", async (req, res) => {
  const { userEmail, isAdmin } = req.body;

  try {
    const accountAccessCheck = await checkUserOrAdminAccess(userEmail, isAdmin);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpGenerationPreCheck = await otpPreConditions(userEmail, isAdmin);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    const requestNewOtp = await generateOtp(isAdmin, userEmail, "Password Reset");

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    let emailSubject = "";

    if (isAdmin) {
      emailSubject = "AU Resume Builder admin account password reset OTP";
    } else {
      emailSubject = "AU Resume Builder account password reset OTP";
    }

    const emailHeading =
      "Use the below One Time Password to reset your account's password";
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      userEmail,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Failed to send otp to user",
      });
    }

    res.json({ message: "OTP sent to email successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
