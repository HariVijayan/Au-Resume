import express from "express";
import adminOtp from "../../models/admin/otp.js";
import getAdminOtp from "../components/getAdminOtp.js";
import sendEmailToUser from "../components/sendEmail.js";

const router = express.Router();

const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

const generateStrongOtp = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()";
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

router.post("/get-approval-otp", async (req, res) => {
  const { requestType } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await getAdminOtp(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    const adminEmail = adminCheck.AdminEmail;
    const adminAccount = adminCheck.AdminAccount;
    const adminName = adminAccount.name;

    const otp = generateStrongOtp(6);
    const createdAt = new Date(Date.now());
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_TIME);

    if (requestType === "addNewAdmin") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "New admin approval",
      });

      const emailSubject = "AU Resume Builder Admin Portal OTP";
      const emailHeading = `Hi ${adminName}, use the below One Time Password to approve the new admin account.`;
      const emailBody = `${otp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message: "Unable to send approval otp, try again later.",
        });
      }
    } else if (requestType === "removeAdmin") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Removing admin approval",
      });

      const emailSubject = "AU Resume Builder Admin Portal OTP";
      const emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account removal.`;
      const emailBody = `${otp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message: "Unable to send approval otp, try again later.",
        });
      }
    } else if (requestType === "modifyAdminType") {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Modifying admin approval",
      });

      const emailSubject = "AU Resume Builder Admin Portal OTP";
      const emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin account modification.`;
      const emailBody = `${otp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message: "Unable to send approval otp, try again later.",
        });
      }
    } else {
      await adminOtp.create({
        email: adminEmail,
        otp,
        createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
        otpFor: "Admin Management Action approval",
      });

      const emailSubject = "AU Resume Builder Admin Portal OTP";
      const emailHeading = `Hi ${adminName}, use the below One Time Password to approve the admin portal action.`;
      const emailBody = `${otp} is your OTP. It is valid for 10 minutes. If you haven't made this request, kindly reset your password right away and contact the technical team.`;

      const sendEmail = await sendEmailToUser(
        adminEmail,
        emailSubject,
        emailHeading,
        emailBody
      );

      if (sendEmail.Success === "NO") {
        console.log(sendEmail.Reason);
        return res.status(sendEmail.HtmlCode).json({
          message: "Unable to send approval otp, try again later.",
        });
      }
    }

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
