import userOtp from "../../models/user/otp.js";
import adminOtp from "../../models/admin/otp.js";

const generateNewOtp = (length) => {
  const characters =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
};

async function generateOtp(isAdmin, otpRequestedBy, otpReason) {
  try {
    const newOtp = generateNewOtp(6);

    if (isAdmin) {
      await adminOtp.deleteMany({ email: otpRequestedBy });
      await adminOtp.create({
        email: otpRequestedBy,
        otp: newOtp,
        otpFor: otpReason,
      });
    } else {
      await userOtp.deleteMany({ email: otpRequestedBy });
      await userOtp.create({
        email: otpRequestedBy,
        otp: newOtp,
        otpFor: otpReason,
      });
    }
    return {
      success: true,
      responseDetails: {
        statusCode: 200,
        code: "SUCCESS",
        message: "Successfully generated Otp",
        timestamp: new Date().toISOString(),
      },
      otherData: {
        NewOtp: newOtp,
      },
    };
  } catch (error) {
    return {
      success: false,
      responseDetails: {
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: error,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export default generateOtp;
