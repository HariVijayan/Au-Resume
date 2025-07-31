import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import adminLogs from "../../models/logs/admin.js";
import adminErrorLogs from "../../models/logs/adminError.js";
import userLogs from "../../models/logs/user.js";
import userErrorLogs from "../../models/logs/userError.js";
import addLogs from "../../helper/functions/addLogs.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";

const router = express.Router();

router.post("/deleteLogs", async (req, res) => {
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

    if (collectionName === "Admin Logs") {
      await adminLogs.deleteMany({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "Admin Error Logs") {
      await adminErrorLogs.deleteMany({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "User Logs") {
      await userLogs.deleteMany({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else if (collectionName === "User Error Logs") {
      await userErrorLogs.deleteMany({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
      });
    } else {
      return res.status(400).json({ message: "Invalid collection name" });
    }

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Deleted logs between ${startDateObj} and ${endDateObj} from ${collectionName} table.`
    );
    return res.status(200).json({
      message: `Logs has been deleted successfully.`,
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to delete logs. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
