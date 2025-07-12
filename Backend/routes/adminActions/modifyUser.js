import express from "express";
import adminUser from "../../models/admin/admin.js";
import userDBModel from "../../models/user/user.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const router = express.Router();

const generateStrongPassword = (length = 8) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

router.post("/modifyUser", async (req, res) => {
  const {
    modifyUserEmail,
    modifyUserRegNo,
    passwordReset,
    accountUnlock,
    otpInput,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

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

    const modifiableUser = await userDBModel.findOne({
      email: modifyUserEmail,
      registerNumber: modifyUserRegNo,
    });

    if (!modifiableUser) {
      return res.status(400).json({ message: "No such user found." });
    }

    if (accountUnlock) {
      await userDBModel.updateOne(
        { email: modifyUserEmail },
        {
          $set: {
            failedLoginAttempts: 0,
            lockUntil: null,
            lockUntilFormatted: null,
          },
        }
      );
    }

    if (passwordReset) {
      const newUserPassword = generateStrongPassword(8);
      const hashedPassword = crypto
        .createHash("sha256")
        .update(newUserPassword)
        .digest("hex");
      await userDBModel.updateOne(
        { email: modifyUserEmail },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: modifyUserEmail,
        subject: "An admin has initiated a password reset for your account",
        text: `Your new password is: ${newUserPassword}. Use the forgot password option in the login page if you wish to change your password.`,
      };

      await transporter.sendMail(mailOptions);
    }

    await adminOtp.deleteMany({ email: adminEmail });

    res.status(200).json({
      message: "User account modified successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred please try again." });
  }
});

export default router;
