import adminOtp from "../../../models/admin/otp.js";
import userOtp from "../../../models/user/otp.js";

async function getUserAndAdminOtp(requestedEmail, isAdmin) {
  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail });
  }

  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
  ) {
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute",
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
