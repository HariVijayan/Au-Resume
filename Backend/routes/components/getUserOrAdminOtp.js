import admin from "../../models/admin/admin.js";
import user from "../../models/user/user.js";
import adminOtp from "../../models/admin/otp.js";
import userOtp from "../../models/user/otp.js";

const OTP_REQUEST_LIMIT = 60 * 1000; // 1 minute

async function getUserAndAdminOtp(requestedEmail, isAdmin) {
  let requestedAccount;
  if (isAdmin) {
    requestedAccount = await admin.findOne({ email: requestedEmail });
  } else {
    requestedAccount = await user.findOne({ email: requestedEmail });
  }

  if (!requestedAccount) {
    return { Valid: "NO", HtmlCode: 404, Reason: "User not found." };
  }

  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail });
  }

  if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < OTP_REQUEST_LIMIT) {
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute.",
    };
  }

  if (isAdmin) {
    await adminOtp.deleteMany({ email: requestedEmail });
  } else {
    await userOtp.deleteMany({ email: requestedEmail });
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default getUserAndAdminOtp;
