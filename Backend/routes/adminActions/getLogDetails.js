import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import adminLogs from "../../models/logs/admin.js";
import adminErrorLogs from "../../models/logs/adminError.js";
import userLogs from "../../models/logs/user.js";
import userErrorLogs from "../../models/logs/userError.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/getLogDetails", async (req, res) => {
  const { collectionName, startDate, endDate } = req.body;
  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;

    let toBeAffectedLogs;

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

    toBeAffectedLogs = logs.length;

    res.json({
      toBeAffectedLogs,
      logs,
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to get log details. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
