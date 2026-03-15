import User from "../../../models/user/user.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";

async function checkUserAccess(accessToken) {
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

  const session = await userCurrentSession.findOne({ userId, sessionId });
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

  const userEmail = session.email;

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

  const user = await User.findOne({ email: userEmail });

  if (!user) {
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
