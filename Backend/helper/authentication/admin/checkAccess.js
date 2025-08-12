import adminUser from "../../../models/admin/admin.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";
import addLogs from "../../functions/addLogs.js";

async function checkAdminAccess(accessToken) {
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

  const session = await adminCurrentSession.findOne({ userId, sessionId });
  if (!session) {
    await addLogs(
      true,
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

  const adminEmail = session.email;

  if (session.expiresAt < Date.now()) {
    await addLogs(
      true,
      true,
      adminEmail,
      adminEmail,
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

  const admin = await adminUser.findOne({ email: adminEmail });

  if (!admin) {
    await addLogs(
      true,
      true,
      adminEmail,
      adminEmail,
      "Confidential",
      "P1",
      "Access attempt without an admin account. Potential phising attempt."
    );
    return {
      Valid: "NO",
      HtmlCode: 403,
      Reason: "Unauthorised access. Not an admin",
    };
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
    AdminAccount: admin,
    AdminEmail: adminEmail,
  };
}

export default checkAdminAccess;
