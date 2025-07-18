import express from "express";
import getUserOrAdminOtp from "../../../components/getUserOrAdminOtp.js";
import sendEmailToUser from "../../../components/sendEmail.js";
import generateOtp from "../../../components/generateOtp.js";

const router = express.Router();

router.post("/password-reset-otp", async (req, res) => {
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
      emailSubject = "AU Resume Builder admin account password reset OTP";
    } else {
      emailSubject = "AU Resume Builder account password reset OTP";
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

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
