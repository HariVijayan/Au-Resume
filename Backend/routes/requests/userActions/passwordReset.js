import express from "express";
import User from "../../../models/user/user.js";
import adminUser from "../../../models/admin/admin.js";
import crypto from "crypto";
import checkPassword from "../../../helper/functions/checkPassword.js";
import addLogs from "../../../helper/functions/addLogs.js";
import resumeData from "../../../models/pdf/resumeData.js";
import userCurrentSession from "../../../models/user/currentSession.js";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { email, newPassword, isAdmin } = req.body;
  try {
    const passwordCheck = checkPassword(newPassword);
    if (!passwordCheck.Valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const hashedPassword = crypto
      .createHash("sha256")
      .update(newPassword)
      .digest("hex");

    if (isAdmin) {
      await adminUser.updateOne({ email }, { password: hashedPassword });
    } else {
      await resumeData.deleteMany({ login_email: email });
      await userCurrentSession.deleteMany({ email });
      await User.updateOne({ email }, { password: hashedPassword });
    }

    await addLogs(
      isAdmin,
      false,
      email,
      email,
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
      `Failed to perform password reset. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
