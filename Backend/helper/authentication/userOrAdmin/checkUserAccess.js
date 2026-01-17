import User from "../../../models/user/user.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";

async function checkUserAccess(accessToken) {
  if (!accessToken) {
    return { Valid: "NO", HtmlCode: 400, Reason: "No token provided" };
  }

  const { userId, sessionId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  const session = await userCurrentSession.findOne({ userId, sessionId });
  if (!session) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Session expired. Log in again",
    };
  }

  const userEmail = session.email;

  if (session.expiresAt < Date.now()) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Session expired. Log in again",
    };
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return {
      Valid: "NO",
      HtmlCode: 403,
      Reason: "Unauthorised access. Not an user",
    };
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
    UserEmail: userEmail,
  };
}

export default checkUserAccess;
