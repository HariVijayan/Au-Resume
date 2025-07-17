import express from "express";
import adminUser from "../../models/admin/admin.js";
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

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await checkAdminAccessAndOtp(accessToken, otpInput);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
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

      const emailSubject =
        "An admin has initiated a password reset for your AU Resume Builder account";
      const emailHeading = `Hi ${adminToBeModified.name}, your admin account's password has been reset.`;
      const emailBody = `Your new password is: ${newAdminPassword}. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message:
            "Failed to send new password to the admin. Please restart the process.",
        });
      }
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

    res.status(200).json({
      message: "Admin modified successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred please try again." });
  }
});

export default router;
