import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/removeAdmin", async (req, res) => {
  const { remAdminEmail, adminType, otpInput } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;

    const adminOtpVerification = await verifyAdminOtp(adminEmail, otpInput);

    if (adminOtpVerification.Valid === "NO") {
      return res
        .status(adminOtpVerification.HtmlCode)
        .json({ message: adminOtpVerification.Reason });
    }

    const removeAdmin = await adminUser.findOne({
      email: remAdminEmail,
      accountType: adminType,
    });

    if (!removeAdmin) {
      return res.status(400).json({ message: "No such admin found" });
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

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Successfully removed admin ${remAdminEmail}.`
    );

    res.json({
      message: "Admin removed successfully",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to remove admin. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
