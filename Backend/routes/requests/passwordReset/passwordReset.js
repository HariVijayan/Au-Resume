import express from "express";
import User from "../../../models/user/user.js";
import adminUser from "../../../models/admin/admin.js";
import crypto from "crypto";
import checkPassword from "../../../helper/checkPassword.js";

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  const { email, newPassword, isAdmin } = req.body;
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
    await User.updateOne({ email }, { password: hashedPassword });
  }

  res.json({
    message: "Password updated. Please login with your new password.",
  });
});

export default router;
