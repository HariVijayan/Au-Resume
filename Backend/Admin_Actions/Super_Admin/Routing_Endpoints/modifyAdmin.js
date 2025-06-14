import express from "express";
import adminUser from "../../../Login/Database_Models/adminUser.js";
import adminCurrentSession from "../../../Login/Database_Models/adminCurrentSession.js";
import adminOtp from "../../../Login/Database_Models/adminOtp.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/adminType", async (req, res) => {
  const { modifyAdminEmail, adminType, otpInput } = req.body;

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

    let modifyAdmin = await adminUser.findOne({
      email: modifyAdminEmail,
    });

    if (!modifyAdmin) {
      return res.status(400).json({ message: "No such admin found." });
    }

    modifyAdmin = await adminUser.findOne({
      email: modifyAdminEmail,
      accountType: adminType,
    });

    if (modifyAdmin) {
      return res.status(400).json({
        message: "The mentioned admin already has the provided access type.",
      });
    }

    await adminUser.updateOne(
      { email: modifyAdminEmail }, // Find user by email
      { $set: { accountType: adminType } } // Modify the accountType field
    );

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
