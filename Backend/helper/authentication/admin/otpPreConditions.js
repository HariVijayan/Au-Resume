import adminOtp from "../../../models/admin/otp.js";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function getAdminOtp(adminEmail) {
  const lastOtp = await adminOtp.findOne({ adminEmail });

  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
  ) {
    logWarning(
      "/helper/authentication/admin/otpPreConditions",
      "TOO_MANY_REQUESTS",
      "Too many requests in a short period",
      `email: ${adminEmail}`,
    );
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

  await adminOtp.deleteMany({ email: adminEmail });

  logInfo(
    "/helper/authentication/admin/otpPreConditions",
    "OTP_PRECONDITIONS_VERIFIED",
    "Otp preconditions cleared successfully",
    `email: ${adminEmail}`,
  );

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

export default getAdminOtp;
