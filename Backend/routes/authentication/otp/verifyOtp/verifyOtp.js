import express from "express";
import Otp from "../../../../models/user/otp.js";
import adminOtp from "../../../../models/admin/otp.js";

const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email, isAdmin, otp } = req.body;

  try {
    let storedOtp;
    if (isAdmin) {
      storedOtp = await adminOtp.findOne({ email, otp });
    } else {
      storedOtp = await Otp.findOne({ email, otp });
    }

    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      if (isAdmin) {
        await adminOtp.deleteMany({ email });
      } else {
        await Otp.deleteMany({ email });
      }
      return res.status(400).json({ message: "OTP expired" });
    }

    if (isAdmin) {
      await adminOtp.deleteMany({ email });
    } else {
      await Otp.deleteMany({ email });
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
