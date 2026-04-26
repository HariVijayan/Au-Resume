import admin from "../../../models/admin/admin.js";
import user from "../../../models/user/user.js";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function checkUserOrAdminAccess(requestedEmail, isAdmin) {
  let requestedAccount;
  if (isAdmin) {
    requestedAccount = await admin.findOne({ email: requestedEmail });
  } else {
    requestedAccount = await user.findOne({ email: requestedEmail });
  }

  if (!requestedAccount) {
    logWarning(
      "/helper/authentication/userOrAdmin/checkAccess",
      "INVALID_USER",
      "No such user or admin exists",
      `email: ${requestedEmail}`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
        timestamp: new Date().toISOString(),
      },
    };
  }

  logInfo(
    "/helper/authentication/userOrAdmin/checkAccess",
    "ACCESS_CHECK_SUCCESS",
    "Access check verification success",
    `email: ${requestedEmail}`,
  );

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid user or admin",
      timestamp: new Date().toISOString(),
    },
    otherData: {
      UserAccount: requestedAccount,
    },
  };
}

export default checkUserOrAdminAccess;
