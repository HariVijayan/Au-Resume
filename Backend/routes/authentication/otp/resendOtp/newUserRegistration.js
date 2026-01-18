import express from "express";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/pendingUser/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
const router = express.Router();

router.post("/registration", async (req, res) => {
  const { userEmail } = req.body;

  try {
    const accountAccessCheck = await checkPendingUserAccess(userEmail);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpGenerationPreCheck = await otpPreConditions(userEmail);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    const requestNewOtp = await generateOtp(
      false,
      userEmail,
      "New User Registration",
    );

    if (requestNewOtp.Success === "NO") {
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder resend OTP request";
    const emailHeading = `Use the below One Time Password to register your account.`;
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      userEmail,
      emailSubject,
      emailHeading,
      emailBody,
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message: "Failed to send otp to user",
      });
    }

    res.json({ message: "New OTP sent to email successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
