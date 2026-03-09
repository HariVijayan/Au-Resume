import adminOtp from "../../../models/admin/otp.js";
import userOtp from "../../../models/user/otp.js";

async function verifyUserOrAdminOtp(requestedEmail, isAdmin, otpInput) {
  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail, otp: otpInput });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail, otp: otpInput });
  }

  if (!lastOtp) {
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

  if (lastOtp.expiresAt < Date.now()) {
    if (isAdmin) {
      await adminOtp.deleteMany({ email: requestedEmail });
    } else {
      await userOtp.deleteMany({ email: requestedEmail });
    }
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "OTP expired",
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
      message: "Otp verified successfully",
      timestamp: new Date().toISOString(),
    },
  };
}

export default verifyUserOrAdminOtp;
