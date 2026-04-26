import adminUser from "../../../models/admin/admin.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function checkAdminAccess(accessToken) {
  if (!accessToken) {
    logWarning(
      "/helper/authentication/admin/checkAccess",
      "NO_ACCESS_TOKEN",
      "No access token provided",
      ``,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "No token provided",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const { userId, sessionId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  const session = await adminCurrentSession.findOne({ userId, sessionId });
  if (!session) {
    logWarning(
      "/helper/authentication/admin/checkAccess",
      "NO_ACTIVE_SESSION",
      "No current active session",
      ``,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Session expired. Log in again",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const adminEmail = session.email;

  if (session.expiresAt < Date.now()) {
    logWarning(
      "/helper/authentication/admin/checkAccess",
      "EXPIRED_SESSION",
      "Expired session",
      `email: ${adminEmail}`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Session expired. Log in again",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const admin = await adminUser.findOne({ email: adminEmail });

  if (!admin) {
    logWarning(
      "/helper/authentication/admin/checkAccess",
      "NOT_AN_ADMIN",
      "User is not an admin",
      `email: ${adminEmail}`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Unauthorised access. Not an admin",
        timestamp: new Date().toISOString(),
      },
    };
  }

  logInfo(
    "/helper/authentication/admin/checkAccess",
    "ACCESS_CHECK_SUCCESS",
    "Admin access check verification success",
    `email: ${adminEmail}`,
  );

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid access",
      timestamp: new Date().toISOString(),
    },
    otherData: {
      AdminAccount: admin,
      AdminEmail: adminEmail,
    },
  };
}

export default checkAdminAccess;
