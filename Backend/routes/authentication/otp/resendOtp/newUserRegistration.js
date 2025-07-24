import express from "express";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";
import otpPreConditions from "../../../../helper/authentication/pendingUser/otpPreConditions.js";
import sendEmailToUser from "../../../../helper/functions/sendEmail.js";
import generateOtp from "../../../../helper/functions/generateOtp.js";
import addLogs from "../../../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email } = req.body;

  try {
    const accountAccessCheck = await checkPendingUserAccess(email);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpGenerationPreCheck = await otpPreConditions(email);

    if (otpGenerationPreCheck.Valid === "NO") {
      return res
        .status(otpGenerationPreCheck.HtmlCode)
        .json({ message: otpGenerationPreCheck.Reason });
    }

    const requestNewOtp = await generateOtp(
      false,
      email,
      "New User Registration"
    );

    if (requestNewOtp.Success === "NO") {
      console.log(requestNewOtp.Reason);
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp, try again later.",
      });
    }

    const newOtp = requestNewOtp.NewOtp;

    const emailSubject = "AU Resume Builder resend OTP request";
    const emailHeading = `Use the below One Time Password to register your account.`;
    const emailBody = `${newOtp} is your OTP. It is valid for 10 minutes.`;

    const sendEmail = await sendEmailToUser(
      email,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      console.log(sendEmail.Reason);
      return res.status(sendEmail.HtmlCode).json({
        message: "Please restart the process.",
      });
    }

    await addLogs(
      false,
      false,
      email,
      email,
      "Public",
      "P4",
      `Requested otp resending to verify new account.`
    );

    res.json({ message: "New OTP sent to email" });
  } catch (error) {
    await addLogs(
      false,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to resend otp for new account registration. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
