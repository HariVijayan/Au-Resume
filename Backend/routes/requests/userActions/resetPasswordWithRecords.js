import express from "express";
import User from "../../../models/user/user.js";
import crypto from "crypto";
import checkPassword from "../../../helper/functions/checkPassword.js";
import resumeData from "../../../models/pdf/resumeData.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import addLogs from "../../../helper/functions/addLogs.js";
import verifyUserOrAdminOtp from "../../../helper/authentication/userOrAdmin/verifyOtp.js";

const router = express.Router();

router.post("/resetPassword", async (req, res) => {
  const { userEmail, newPassword, otpInput } = req.body;
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

    const passwordCheck = checkPassword(newPassword);
    if (!passwordCheck.Valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(newPassword)
      .digest("hex");

    await resumeData.deleteMany({ login_email: userEmail });

    await userCurrentSession.deleteMany({ email: userEmail });

    await User.updateOne({ email: userEmail }, { password: hashedPassword });

    await addLogs(
      false,
      false,
      userEmail,
      userEmail,
      "Public",
      "P4",
      `Successful password reset.`
    );

    res.json({
      message: "Password updated. Redirecting to login page",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to perform password reset from user profile. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
