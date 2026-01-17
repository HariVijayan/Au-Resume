import adminOtp from "../../../models/admin/otp.js";

async function getAdminOtp(adminEmail) {
  const lastOtp = await adminOtp.findOne({ adminEmail });

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

  await adminOtp.deleteMany({ email: adminEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default getAdminOtp;
