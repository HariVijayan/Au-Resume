import express from "express";
import userDBModel from "../../models/user/user.js";
import crypto from "crypto";
import checkAdminAccessAndOtp from "../components/verifyAdminOtp.js";
import sendEmailToUser from "../components/sendEmail.js";

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

      const emailSubject = "AU Resume Builder account password reset";
      const emailHeading = `Your account's password has been reset by an admin.`;
      const emailBody = `Your new password is: ${newUserPassword}. Use the forgot password option in the login page if you wish to change your password.`;

      const sendEmail = await sendEmailToUser(
        modifyUserEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message:
            "Failed to send new password to the user. Please restart the process.",
        });
      }
    }

    res.status(200).json({
      message: "User account modified successfully.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error occurred please try again. ${error}` });
  }
});

export default router;
