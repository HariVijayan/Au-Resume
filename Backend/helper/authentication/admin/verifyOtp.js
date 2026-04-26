import adminOtp from "../../../models/admin/otp.js";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function verifyAdminOtp(adminEmail, otpInput) {
  const storedOtp = await adminOtp.findOne({
    email: adminEmail,
    otp: otpInput,
  });

  if (!storedOtp) {
    await adminOtp.deleteMany({ email: adminEmail });

    logWarning(
      "/helper/authentication/admin/verifyOtp",
      "INVALID_OTP",
      "No such otp exists for the user",
      `email: ${adminEmail}`,
    );

    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Invalid Otp",
        timestamp: new Date().toISOString(),
      },
    };
  }

  if (storedOtp.expiresAt < Date.now()) {
    await adminOtp.deleteMany({ adminEmail });

    logWarning(
      "/helper/authentication/admin/verifyOtp",
      "EXPIRED_OTP",
      "Otp expired",
      `email: ${adminEmail}`,
    );

    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Otp expired",
        timestamp: new Date().toISOString(),
      },
    };
  }

  await adminOtp.deleteMany({ email: adminEmail });

  logInfo(
    "/helper/authentication/admin/verifyOtp",
    "OTP_VERIFICATION_SUCCESS",
    "Otp verified successfully",
    `email: ${adminEmail}`,
  );

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Otp verified successfully",
      timestamp: new Date().toISOString(),
    },
  };
}

export default verifyAdminOtp;
