import userOtp from "../models/user/otp.js";
import adminOtp from "../models/admin/otp.js";

const generateNewOtp = (length) => {
  const characters =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
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
      Success: "YES",
      HtmlCode: 200,
      NewOtp: newOtp,
    };
  } catch (error) {
    return {
      Success: "NO",
      HtmlCode: 500,
      Reason: error,
    };
  }
}

export default generateOtp;
