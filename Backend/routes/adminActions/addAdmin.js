import express from "express";
import adminUser from "../../models/admin/admin.js";
import crypto from "crypto";
import sendEmailToUser from "../../helper/functions/sendEmail.js";
import generatePassword from "../../helper/functions/generatePassword.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/newAdmin", async (req, res) => {
  const { newAdminName, newAdminEmail, adminType, otpInput } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;

    const adminOtpVerification = await verifyAdminOtp(adminEmail, otpInput);

    if (adminOtpVerification.Valid === "NO") {
      return res
        .status(adminOtpVerification.HtmlCode)
        .json({ message: adminOtpVerification.Reason });
    }

    const newAdminPassword = generatePassword();

    const hashedPassword = crypto
      .createHash("sha256")
      .update(newAdminPassword)
      .digest("hex");

    const newAdmin = new adminUser({
      name: newAdminName,
      email: newAdminEmail,
      password: hashedPassword,
      createdBy: adminEmail,
      accountType: adminType,
    });
    await newAdmin.save();

    const emailSubject = "You've been added as an admin to AU Resume Builder";
    const emailHeading = `Hi ${newAdminName}, your admin account is created in Au Resume Builder.`;
    const emailBody = `${newAdminPassword} is your login password. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`;

    const sendEmail = await sendEmailToUser(
      newAdminEmail,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      return res.status(sendEmail.HtmlCode).json({
        message:
          "Admin added. System errored while sending credentials. Delete account and add again",
      });
    }

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Successfully added new admin ${newAdminEmail}.`
    );

    res.json({
      message: "New admin added successfully",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to add new admin. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
