import express from "express";
import getUserOrAdminOtp from "../../../../helper/getUserOrAdminOtp.js";
import sendEmailToUser from "../../../../helper/sendEmail.js";
import generateOtp from "../../../../helper/generateOtp.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, isAdmin } = req.body;
  try {
    const accountCheck = await getUserOrAdminOtp(email, isAdmin);
    if (accountCheck.Valid === "NO") {
      return res
        .status(accountCheck.HtmlCode)
        .json({ message: accountCheck.Reason });
    }

    const requestNewOtp = await generateOtp(isAdmin, email, "Password Reset");

    if (requestNewOtp.Success === "NO") {
      console.log(requestNewOtp.Reason);
      return res.status(requestNewOtp.HtmlCode).json({
        message: "Unable to generate otp, try again later.",
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
      console.log(sendEmail.Reason);
      return res.status(sendEmail.HtmlCode).json({
        message: "Please restart the process.",
      });
    }

    res.json({ message: "New OTP sent to email" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
