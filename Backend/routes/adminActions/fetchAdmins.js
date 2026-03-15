import express from "express";
import adminUser from "../../models/admin/admin.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/adminListGrouped",
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (!adminAccessCheck.success) {
      return res.status(adminAccessCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: adminAccessCheck.responseDetails.code,
          message: adminAccessCheck.responseDetails.message,
          timestamp: adminAccessCheck.responseDetails.timestamp,
        },
      });
    }

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
      },
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

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Successfully fetched admin list",
        timestamp: new Date().toISOString(),
      },
      otherData: {
        userList: cleanedUsers,
        numAdmins: numAdmins,
      },
    });
  }),
);

export default router;
