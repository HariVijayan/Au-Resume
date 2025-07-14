import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import checkAdminAccessAndOtp from "../components/verifyAdminOtp.js";

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
    const adminCheck = await checkAdminAccessAndOtp(accessToken, otpInput);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
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

    res.status(200).json({
      message: "User account modified successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred please try again." });
  }
});

export default router;
