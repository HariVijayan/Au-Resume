import express from "express";
import adminUser from "../../../Login/Database_Models/adminUser.js";
import adminCurrentSession from "../../../Login/Database_Models/adminCurrentSession.js";
import adminOtp from "../../../Login/Database_Models/adminOtp.js";
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

router.post("/admin-modifications", async (req, res) => {
  const {
    adminEmail,
    currentAdminType,
    otpInput,
    nameChangeNeeded,
    adminTypeChange,
    passwordReset,
    accountUnlock,
    newName,
    newAdminType,
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

    const authorisingAdminEmail = session.email;

    const user = await adminUser.findOne({ email: authorisingAdminEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
    }

    const storedOtp = await adminOtp.findOne({
      email: authorisingAdminEmail,
      otp: otpInput,
    });

    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      await adminOtp.deleteMany({ authorisingAdminEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    let adminToBeModified = await adminUser.findOne({
      email: adminEmail,
      accountType: currentAdminType,
    });

    if (!adminToBeModified) {
      return res.status(400).json({ message: "No such admin found." });
    }

    if (nameChangeNeeded) {
      await adminUser.updateOne(
        { email: adminEmail },
        { $set: { name: newName } }
      );
    }

    if (accountUnlock) {
      await adminUser.updateOne(
        { email: adminEmail },
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
      const newAdminPassword = generateStrongPassword(8);
      const hashedPassword = crypto
        .createHash("sha256")
        .update(newAdminPassword)
        .digest("hex");
      await adminUser.updateOne(
        { email: adminEmail },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: adminEmail,
        subject: "An admin has initiated a password reset for your account",
        text: `Your new password is: ${newAdminPassword}. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`,
      };

      await transporter.sendMail(mailOptions);
    }

    if (adminTypeChange) {
      adminToBeModified = await adminUser.findOne({
        email: adminEmail,
        accountType: newAdminType,
      });

      if (adminToBeModified) {
        return res.status(400).json({
          message: "The mentioned admin already has the provided access type.",
        });
      }

      await adminUser.updateOne(
        { email: adminEmail },
        { $set: { accountType: newAdminType } }
      );
    }

    await adminOtp.deleteMany({ email: authorisingAdminEmail });

    res.status(200).json({
      message: "Admin modified successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred please try again." });
  }
});

export default router;
