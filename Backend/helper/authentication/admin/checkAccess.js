import adminUser from "../../../models/admin/admin.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";

async function checkAdminAccess(accessToken) {
  if (!accessToken) {
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

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid access",
      timestamp: new Date().toISOString(),
    },
    AdminAccount: admin,
    AdminEmail: adminEmail,
  };
}

export default checkAdminAccess;
