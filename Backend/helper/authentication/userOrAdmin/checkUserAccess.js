import User from "../../../models/user/user.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function checkUserAccess(accessToken) {
  if (!accessToken) {
    logWarning(
      "/helper/authentication/userOrAdmin/checkUserAccess",
      "NO_ACCESS_TOKEN",
      "No access token",
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

  const session = await userCurrentSession.findOne({ userId, sessionId });
  if (!session) {
    logWarning(
      "/helper/authentication/userOrAdmin/checkUserAccess",
      "NO_ACTIVE_SESSION",
      "User session expired or doesn't exist",
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

  const userEmail = session.email;

  if (session.expiresAt < Date.now()) {
    logWarning(
      "/helper/authentication/userOrAdmin/checkUserAccess",
      "EXPIRED_SESSION",
      "User session expired",
      `email: ${userEmail}`,
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

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    logWarning(
      "/helper/authentication/userOrAdmin/checkUserAccess",
      "INVALID_USER",
      "Not a valid user",
      `email: ${userEmail}`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 401,
        code: "UNAUTHORIZED",
        message: "Unauthorised access. Not an user",
        timestamp: new Date().toISOString(),
      },
    };
  }

  logInfo(
    "/helper/authentication/userOrAdmin/checkUserAccess",
    "ACCESS_CHECK_SUCCESS",
    "User access check verification success",
    `email: ${userEmail}`,
  );

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid user",
      timestamp: new Date().toISOString(),
    },
    otherData: {
      UserEmail: userEmail,
    },
  };
}

export default checkUserAccess;
