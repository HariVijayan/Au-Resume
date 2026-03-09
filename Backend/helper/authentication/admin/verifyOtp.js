import adminOtp from "../../../models/admin/otp.js";

async function verifyAdminOtp(adminEmail, otpInput) {
  const storedOtp = await adminOtp.findOne({
    email: adminEmail,
    otp: otpInput,
  });

  if (!storedOtp) {
    await adminOtp.deleteMany({ email: adminEmail });
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
