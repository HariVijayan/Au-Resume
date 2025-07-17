import adminUser from "../../models/admin/admin.js";
import adminOtp from "../../models/admin/otp.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";

const OTP_REQUEST_LIMIT = 60 * 1000; // 1 minute

async function getAdminOtp(accessToken) {
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

  const lastOtp = await adminOtp.findOne({ adminEmail });

  if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < OTP_REQUEST_LIMIT) {
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute.",
    };
  }

  await adminOtp.deleteMany({ email: adminEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
    AdminAccount: admin,
    AdminEmail: adminEmail,
  };
}

export default getAdminOtp;
