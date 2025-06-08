import express from "express";
import User from "../../../Database_Models/User.js";
import adminUser from "../../../Database_Models/adminUser.js";
import crypto from "crypto";

const router = express.Router();

function isPasswordStrong(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);

  if (password.length < minLength) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long.",
    };
  }
  if (!hasUpperCase) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter.",
    };
  }
  if (!hasLowerCase) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter.",
    };
  }
  if (!hasNumber) {
    return {
      isValid: false,
      message: "Password must contain at least one number.",
    };
  }
  if (!hasSpecialChar) {
    return {
      isValid: false,
      message: "Password must contain at least one special character.",
    };
  }

  return { isValid: true, message: "Password is strong." };
}

router.post("/reset-password", async (req, res) => {
  const { email, newPassword, isAdmin } = req.body;
  const passwordCheck = isPasswordStrong(newPassword);
  if (!passwordCheck.isValid) {
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
