import userOtp from "../../models/user/otp.js";
import adminOtp from "../../models/admin/otp.js";

const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

const generateNewOtp = (length) => {
  const characters =
    "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .replace(",", "");
};

async function generateOtp(isAdmin, otpRequestedBy, otpReason) {
  try {
    const newOtp = generateNewOtp(6);
    const createdTime = new Date(Date.now());
    const expiresTime = new Date(Date.now() + OTP_EXPIRATION_TIME);

    const createdTimeFormatted = formatISTTimestamp(createdTime);
    const expiresTimeFormatted = formatISTTimestamp(expiresTime);

    if (isAdmin) {
      await adminOtp.deleteMany({ email: otpRequestedBy });
      await adminOtp.create({
        email: otpRequestedBy,
        otp: newOtp,
        createdAt: createdTime,
        createdAtFormatted: createdTimeFormatted,
        expiresAt: expiresTime,
        expiresAtFormatted: expiresTimeFormatted,
        otpFor: otpReason,
      });
    } else {
      await userOtp.deleteMany({ email: otpRequestedBy });
      await userOtp.create({
        email: otpRequestedBy,
        otp: newOtp,
        createdAt: createdTime,
        createdAtFormatted: createdTimeFormatted,
        expiresAt: expiresTime,
        expiresAtFormatted: expiresTimeFormatted,
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
