import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import checkAdminAccessAndOtp from "../components/verifyAdminOtp.js";

const router = express.Router();

router.post("/removeAdmin", async (req, res) => {
  const { remAdminEmail, adminType, otpInput } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await checkAdminAccessAndOtp(accessToken, otpInput);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    console.log("Admin Check:", adminCheck);

    const removeAdmin = await adminUser.findOne({
      email: remAdminEmail,
      accountType: adminType,
    });

    if (!removeAdmin) {
      return res.status(400).json({ message: "No such admin found." });
    }

    const existingSessions = await adminCurrentSession.find({
      email: remAdminEmail,
    });

    if (existingSessions) {
      await adminCurrentSession.deleteMany({
        email: remAdminEmail,
      });
    }

    const existingOtp = await adminOtp.find({
      email: remAdminEmail,
    });

    if (existingOtp) {
      await adminOtp.deleteMany({
        email: remAdminEmail,
      });
    }

    await adminUser.deleteOne({ email: remAdminEmail, accountType: adminType });

    res.json({
      message: "Admin removed successfully.",
    });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
