import User from "../../../models/user/user.js";
import userCurrentSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";
import addLogs from "../../functions/addLogs.js";

async function checkUserAccess(accessToken) {
  if (!accessToken) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P1",
      "Access attempt without access token. Potential phising attempt."
    );
    return { Valid: "NO", HtmlCode: 400, Reason: "No token provided" };
  }

  const { userId, sessionId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  const session = await userCurrentSession.findOne({ userId, sessionId });
  if (!session) {
    await addLogs(
      false,
      true,
      "System",
      "System",
      "Confidential",
      "P1",
      "Access attempt without current active session. Potential access token theft."
    );
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Session expired. Log in again",
    };
  }

  const userEmail = session.email;

  if (session.expiresAt < Date.now()) {
    await addLogs(
      true,
      true,
      userEmail,
      userEmail,
      "Confidential",
      "P3",
      "Access attempt with expired session."
    );
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Session expired. Log in again",
    };
  }

  const user = await User.findOne({ email: userEmail });

  if (!user) {
    await addLogs(
      true,
      true,
      userEmail,
      userEmail,
      "Confidential",
      "P1",
      "Access attempt without an user account. Potential phising attempt."
    );
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
