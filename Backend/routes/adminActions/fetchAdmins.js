import express from "express";
import adminUser from "../../models/admin/admin.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/adminListGrouped", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    const adminEmail = adminAccessCheck.AdminEmail;

    const users = await adminUser.find(
      {},
      {
        name: 1,
        email: 1,
        accountType: 1,
        createdAtFormatted: 1,
        createdBy: 1,
        failedLoginAttempts: 1,
        lockUntilFormatted: 1,
        _id: 0,
      }
    );

    const numAdmins = users.length;

    // Clean + flatten with ordering
    const sortOrder = {
      SuperAdmin: 0,
      Admin: 1,
      Analytics: 2,
    };

    const cleanedUsers = users
      .map((user) => ({
        ...user._doc,
        lockUntilFormatted: user.lockUntilFormatted ?? "N/A",
      }))
      .sort((a, b) => sortOrder[a.accountType] - sortOrder[b.accountType]);

    await addLogs(
      true,
      false,
      adminEmail,
      adminEmail,
      "Confidential",
      "P4",
      `Successfully fetched admin list.`
    );

    res.json({
      userList: cleanedUsers,
      numAdmins: numAdmins,
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to fetch admin list. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
