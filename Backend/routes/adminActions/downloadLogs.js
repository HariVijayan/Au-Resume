import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import adminLogs from "../../models/logs/admin.js";
import adminErrorLogs from "../../models/logs/adminError.js";
import userLogs from "../../models/logs/user.js";
import userErrorLogs from "../../models/logs/userError.js";
import addLogs from "../../helper/functions/addLogs.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";

const router = express.Router();

router.post("/downloadLogs", async (req, res) => {
  const { otpInput, collectionName, startDate, endDate } = req.body;
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

    const startDateObj = new Date(startDate);
    startDateObj.setHours(0, 0, 0, 0);
    const endDateObj = new Date(endDate);
    endDateObj.setHours(23, 59, 59, 999);

    let logs;

    if (collectionName === "Admin Logs") {
      logs = await adminLogs.find({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "Admin Error Logs") {
      logs = await adminErrorLogs.find({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "User Logs") {
      logs = await userLogs.find({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "User Error Logs") {
      logs = await userErrorLogs.find({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid collection name" });
    }

    const csvRows = [];

    csvRows.push("Linked Account,Added By,Category,Priority,Log,Created");

    logs.forEach((log) => {
      csvRows.push(
        `${log.logLinkedAccount},${log.logAddedBy},${log.logCategory},${log.logPriority},${log.logDetails},${log.createdAtFormatted}`
      );
    });

    const csvContent = csvRows.join("\n");

    res.setHeader("Content-Disposition", 'attachment; filename="logs.csv"');
    res.setHeader("Content-Type", "text/csv");

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Downloaded logs between ${startDate} and ${endDate} from ${collectionName} table.`
    );

    res.send(csvContent);
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to download logs. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
