import express from "express";
import adminLogs from "../../models/logs/admin.js";
import adminErrorLogs from "../../models/logs/adminError.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/getLogs", async (req, res) => {
  const { logTypeRequested } = req.body;
  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;

    let logs;
    let numLogs;

    if (logTypeRequested === "Regular") {
      logs = await adminLogs.find(
        {},
        {
          logLinkedAccount: 1,
          logAddedBy: 1,
          logPriority: 1,
          logDetails: 1,
          createdAt: 1,
          createdAtFormatted: 1,
        }
      );
      numLogs = logs.length;
    }

    if (logTypeRequested === "Error") {
      logs = await adminErrorLogs.find(
        {},
        {
          logLinkedAccount: 1,
          logAddedBy: 1,
          logPriority: 1,
          logDetails: 1,
          createdAt: 1,
          createdAtFormatted: 1,
        }
      );
      numLogs = logs.length;
    }

    const plainLogs = logs.map((doc) => doc.toObject());

    const timeSortedNewest = [...plainLogs].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    const timeSortedOldest = [...plainLogs].sort(
      (a, b) => a.createdAt - b.createdAt
    );

    const priorityMap = { P1: 1, P2: 2, P3: 3, P4: 4 };

    const prioritySortedHighest = [...plainLogs].sort((a, b) => {
      const priorityDifference =
        priorityMap[a.logPriority] - priorityMap[b.logPriority];
      if (priorityDifference !== 0) {
        return priorityDifference;
      }
      return b.createdAt - a.createdAt;
    });

    const prioritySortedLowest = [...plainLogs].sort((a, b) => {
      const priorityDifference =
        priorityMap[b.logPriority] - priorityMap[a.logPriority];
      if (priorityDifference !== 0) {
        return priorityDifference;
      }
      return b.createdAt - a.createdAt;
    });

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Successfully fetched logs.`
    );

    res.json({
      timeSortedNewest,
      timeSortedOldest,
      prioritySortedHighest,
      prioritySortedLowest,
      totalRecords: numLogs,
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to fetch logs. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
