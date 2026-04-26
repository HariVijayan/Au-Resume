import pendingUser from "../../../models/user/pendingUser.js";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function checkPendingUserAccess(requestedEmail) {
  const requestedAccount = await pendingUser.findOne({ email: requestedEmail });
  if (!requestedAccount) {
    logWarning(
      "/helper/authentication/pendingUser/checkAccess",
      "NO_SUCH_USER",
      "User not found or already verified",
      `email: ${requestedEmail}`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "User not found or already verified",
        timestamp: new Date().toISOString(),
      },
    };
  }

  logInfo(
    "/helper/authentication/pendingUser/checkAccess",
    "ACCESS_CHECK_SUCCESS",
    "Pending user access check success",
    `email: ${requestedEmail}`,
  );

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid pending user",
      timestamp: new Date().toISOString(),
    },
    otherData: {
      PendingUser: requestedAccount,
    },
  };
}

export default checkPendingUserAccess;
