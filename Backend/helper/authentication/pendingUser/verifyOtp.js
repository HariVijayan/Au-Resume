import userOtp from "../../../models/user/otp.js";
import { logWarning, logInfo } from "../../functions/systemLogger.js";

async function verifyPendingUserOtp(requestedEmail, otpInput) {
  const storedOtp = await userOtp.findOne({
    email: requestedEmail,
    otp: otpInput,
  });
  if (!storedOtp) {
    logWarning(
      "/helper/authentication/pendingUser/verifyOtp",
      "INVALID_OTP",
      "No such otp exists for the user",
      `email: ${requestedEmail}`,
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
    await userOtp.deleteMany({ email: requestedEmail });
    logWarning(
      "/helper/authentication/pendingUser/verifyOtp",
      "EXPIRED_OTP",
      "Otp expired",
      `email: ${requestedEmail}`,
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
  await userOtp.deleteMany({ email: requestedEmail });

  logInfo(
    "/helper/authentication/pendingUser/verifyOtp",
    "OTP_VERIFICATION_SUCCESS",
    "Otp verified successfully",
    `email: ${requestedEmail}`,
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

export default verifyPendingUserOtp;
