import express from "express";
import adminUser from "../../models/admin/admin.js";
import crypto from "crypto";
import verifyAdminOtp from "../components/verifyAdminOtp.js";
import sendEmailToUser from "../components/sendEmail.js";

const router = express.Router();

const generateStrongPassword = (length = 8) => {
  const characters =
    "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .replace(",", "");
};

router.post("/newAdmin", async (req, res) => {
  const { newAdminName, newAdminEmail, adminType, otpInput } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const adminCheck = await verifyAdminOtp(accessToken, otpInput);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    const adminEmail = adminCheck.AdminEmail;

    const newAdminPassword = generateStrongPassword(8);
    const createdAt = new Date(Date.now());

    const hashedPassword = crypto
      .createHash("sha256")
      .update(newAdminPassword)
      .digest("hex");

    const newAdmin = new adminUser({
      name: newAdminName,
      email: newAdminEmail,
      password: hashedPassword,
      createdAt,
      createdAtFormatted: formatISTTimestamp(createdAt),
      createdBy: adminEmail,
      accountType: adminType,
    });
    await newAdmin.save();

    const emailSubject = "You've been added as an admin to AU Resume Builder";
    const emailHeading = `Hi ${newAdminName}, your admin account is created in Au Resume Builder.`;
    const emailBody = `Your login password is: ${newAdminPassword}. Use the forgot password option in the login page if you wish to change your password. Ensure "System Admin" option is checked in forgot password page if you proceed to reset your password.`;

    const sendEmail = await sendEmailToUser(
      newAdminEmail,
      emailSubject,
      emailHeading,
      emailBody
    );

    if (sendEmail.Success === "NO") {
      console.log(sendEmail.Reason);
      return res.status(sendEmail.HtmlCode).json({
        message:
          "Admin added. System errored while sending credentials. Delete account and add again.",
      });
    }

    res.json({
      message: "New admin added successfully.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
