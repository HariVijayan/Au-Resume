import express from "express";
import User from "../../../models/user/user.js";
import crypto from "crypto";
import resumeData from "../../../models/pdf/resumeData.js";
import addLogs from "../../../helper/functions/addLogs.js";
import verifyUserOrAdminOtp from "../../../helper/authentication/userOrAdmin/verifyOtp.js";

const router = express.Router();

router.post("/resetEncKey", async (req, res) => {
  const { userEmail, otpInput } = req.body;
  try {
    const otpVerification = await verifyUserOrAdminOtp(
      userEmail,
      false,
      otpInput
    );

    if (otpVerification.Valid === "NO") {
      return res
        .status(otpVerification.HtmlCode)
        .json({ message: otpVerification.Reason });
    }

    const salt = crypto.randomBytes(16);
    const saltBase64 = salt.toString("base64");

    await resumeData.deleteMany({ login_email: userEmail });

    await User.updateOne({ email: userEmail }, { encryptionSalt: saltBase64 });

    await addLogs(
      false,
      false,
      userEmail,
      userEmail,
      "Public",
      "P4",
      `Successful encryption key reset.`
    );

    res.json({
      message: "Encryption Key has been successfully reset",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to perform encryption key reset from user profile. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
