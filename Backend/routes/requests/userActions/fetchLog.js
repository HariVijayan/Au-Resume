import express from "express";
import userLogs from "../../../models/logs/user.js";
import userErrorLogs from "../../../models/logs/userError.js";
import checkUserAccess from "../../../helper/authentication/userOrAdmin/checkUserAccess.js";
import addLogs from "../../../helper/functions/addLogs.js";
import verifyUserOrAdminOtp from "../../../helper/authentication/userOrAdmin/verifyOtp.js";

const router = express.Router();

router.post("/getLogs", async (req, res) => {
  const { otpInput } = req.body;
  try {
    const accessToken = req.cookies.accessToken;

    const userAccessCheck = await checkUserAccess(accessToken);
    if (userAccessCheck.Valid === "NO") {
      return res
        .status(userAccessCheck.HtmlCode)
        .json({ message: userAccessCheck.Reason });
    }

    const userEmail = userAccessCheck.UserEmail;

    const otpVerification = await verifyUserOrAdminOtp(
      userEmail,
      false,
      otpInput
    );

    if (otpVerification.Valid === "NO") {
      return res
        .status(otpVerification.HtmlCode)
        .json({ message: otpVerification.Reason });
    }

    const regularLogs = await userLogs.find(
      { logLinkedAccount: userEmail, logCategory: "Public" },
      {
        logLinkedAccount: 1,
        logAddedBy: 1,
        logDetails: 1,
        createdAt: 1,
        createdAtFormatted: 1,
      }
    );

    const errorLogs = await userErrorLogs.find(
      { logLinkedAccount: userEmail, logCategory: "Public" },
      {
        logLinkedAccount: 1,
        logAddedBy: 1,
        logDetails: 1,
        createdAt: 1,
        createdAtFormatted: 1,
      }
    );

    const logs = [...regularLogs, ...errorLogs];

    const numLogs = logs.length;

    const plainLogs = logs.map((doc) => doc.toObject());

    const timeSortedNewest = [...plainLogs].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    const timeSortedOldest = [...plainLogs].sort(
      (a, b) => a.createdAt - b.createdAt
    );

    await addLogs(
      false,
      false,
      userEmail,
      userEmail,
      "Confidential",
      "P4",
      `Successfully fetched logs.`
    );

    res.json({
      timeSortedNewest,
      timeSortedOldest,
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
