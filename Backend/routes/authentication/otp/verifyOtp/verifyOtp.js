import express from "express";
import verifyUserOrAdminOtp from "../../../../helper/verifyUserOrAdminOtp.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, isAdmin, otp } = req.body;

  try {
    const accountCheck = await verifyUserOrAdminOtp(email, isAdmin, otp);
    if (accountCheck.Valid === "NO") {
      return res
        .status(accountCheck.HtmlCode)
        .json({ message: accountCheck.Reason });
    }

    res.json({
      message: "OTP verified successfully. You can now reset your password.",
    });
  } catch (error) {
    console.error("OTP Verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
