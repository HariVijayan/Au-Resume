import adminUser from "../models/admin/admin.js";
import adminCurrentSession from "../models/admin/currentSession.js";
import jwt from "jsonwebtoken";

async function checkAdminAccess(accessToken) {
  if (!accessToken) {
    return { Valid: "NO", HtmlCode: 400, Reason: "No token provided" };
  }

  const { userId, sessionId } = jwt.verify(accessToken, process.env.JWT_SECRET);

  const session = await adminCurrentSession.findOne({ userId, sessionId });
  if (!session || session.expiresAt < Date.now()) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Session expired. Please log in again.",
    };
  }

  const adminEmail = session.email;

  const admin = await adminUser.findOne({ email: adminEmail });

  if (!admin) {
    return {
      Valid: "NO",
      HtmlCode: 403,
      Reason: "Unauthorised access. Not an admin.",
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
