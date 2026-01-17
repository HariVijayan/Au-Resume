import userOtp from "../../../models/user/otp.js";

async function getPendingUserOtp(requestedEmail) {
  const lastOtp = await userOtp.findOne({ email: requestedEmail });
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

  await userOtp.deleteMany({ email: requestedEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default getPendingUserOtp;
