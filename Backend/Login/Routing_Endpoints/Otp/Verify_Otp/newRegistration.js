import express from "express";
import User from "../../../Database_Models/User.js";
import Otp from "../../../Database_Models/Otp.js";
import PendingUser from "../../../Database_Models/PendingUser.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const storedOtp = await Otp.findOne({ email, otp });
    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP expired" });
    }

    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res
        .status(400)
        .json({ message: "User not found or already verified" });
    }

    const verifiedUser = new User({
      email: pendingUser.email,
      password: pendingUser.password,
      registerNumber: pendingUser.registerNumber,
      department: pendingUser.department,
      courseType: pendingUser.courseType,
      programme: pendingUser.programme,
      branch: pendingUser.branch,
      encryptionSalt: pendingUser.encryptionSalt,
    });
    await verifiedUser.save();

    await PendingUser.deleteMany({ email });
    await Otp.deleteMany({ email });

    res.json({
      message: "OTP verified. Registration complete. You can now login.",
    });
  } catch (error) {
    console.error("OTP Verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
