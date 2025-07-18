import express from "express";
import getPendingUserOtp from "../../../components/getPendingUserOtp.js";
import sendEmailToUser from "../../../components/sendEmail.js";
import generateOtp from "../../../components/generateOtp.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email } = req.body;

  try {
    const accountCheck = await getPendingUserOtp(email);
    if (accountCheck.Valid === "NO") {
      return res
        .status(accountCheck.HtmlCode)
        .json({ message: accountCheck.Reason });
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

    res.json({ message: "New OTP sent to email" });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
