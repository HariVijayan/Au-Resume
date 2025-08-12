import express from "express";
import verifyUserOrAdminOtp from "../../../../helper/authentication/userOrAdmin/verifyOtp.js";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";
import addLogs from "../../../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, isAdmin, otp } = req.body;

  try {
    const accountAccessCheck = await checkUserOrAdminAccess(email, isAdmin);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpVerification = await verifyUserOrAdminOtp(email, isAdmin, otp);

    if (otpVerification.Valid === "NO") {
      return res
        .status(otpVerification.HtmlCode)
        .json({ message: otpVerification.Reason });
    }

    await addLogs(
      isAdmin,
      false,
      email,
      email,
      "Public",
      "P4",
      `Verified email. Initiated password reset process.`
    );

    res.json({
      message: "OTP verified successfully. Redirecting to password reset page",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to verify otp for password reset. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
