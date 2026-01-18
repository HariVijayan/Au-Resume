import express from "express";
import User from "../../../models/user/user.js";
import adminUser from "../../../models/admin/admin.js";
import checkPassword from "../../../helper/functions/checkPassword.js";
import resumeData from "../../../models/pdf/resumeData.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import bcrypt from "bcrypt";

const router = express.Router();

const BCRYPT_COST_FACTOR = 12;

router.post("/reset-password", async (req, res) => {
  const { userEmail, newPassword, isAdmin } = req.body;
  try {
    const passwordCheck = checkPassword(newPassword);
    if (!passwordCheck.Valid) {
      return res.status(400).json({ message: passwordCheck.message });
    }

    const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    if (isAdmin) {
      await adminUser.updateOne(
        { email: userEmail },
        { password: hashedPassword },
      );
    } else {
      await resumeData.deleteMany({ login_email: userEmail });
      await userCurrentSession.deleteMany({ email: userEmail });
      await User.updateOne({ email: userEmail }, { password: hashedPassword });
    }

    res.json({
      message: "Password updated. Redirecting to login page",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
