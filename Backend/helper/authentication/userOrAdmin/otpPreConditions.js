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
      success: false,
      responseDetails: {
        statusCode: 429,
        code: "TOO_MANY_REQUESTS",
        message: "Too many OTP requests. Try again in 1 minute",
        timestamp: new Date().toISOString(),
      },
    };
  }

  if (isAdmin) {
    await adminOtp.deleteMany({ email: requestedEmail });
  } else {
    await userOtp.deleteMany({ email: requestedEmail });
  }

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Otp preconditions cleared successfully",
      timestamp: new Date().toISOString(),
    },
  };
}

export default getUserAndAdminOtp;
