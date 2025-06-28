import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/removeAdmin", async (req, res) => {
  const { remAdminEmail, adminType, otpInput } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const session = await adminCurrentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    const adminEmail = session.email;

    const user = await adminUser.findOne({ email: adminEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
    }

    const storedOtp = await adminOtp.findOne({
      email: adminEmail,
      otp: otpInput,
    });

    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      await adminOtp.deleteMany({ adminEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    const removeAdmin = await adminUser.findOne({
      email: remAdminEmail,
      accountType: adminType,
    });

    if (!removeAdmin) {
      return res.status(400).json({ message: "No such admin found." });
    }

    await adminUser.deleteOne({ email: remAdminEmail, accountType: adminType });

    await adminOtp.deleteMany({ email: adminEmail });

    res.json({
      message: "Admin removed successfully.",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
