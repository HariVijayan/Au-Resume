import express from "express";
import verifyUserOrAdminOtp from "../../../../helper/authentication/userOrAdmin/verifyOtp.js";
import checkUserOrAdminAccess from "../../../../helper/authentication/userOrAdmin/checkAccess.js";

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

    res.json({
      message: "OTP verified successfully. Redirecting to password reset page",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
