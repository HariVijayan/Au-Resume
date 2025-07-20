import pendingUser from "../../models/user/pendingUser.js";
import userOtp from "../../models/user/otp.js";

async function getPendingUserOtp(requestedEmail) {
  const requestedAccount = await pendingUser.findOne({ email: requestedEmail });
  if (!requestedAccount) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "User not found or already verified",
    };
  }

  const lastOtp = await userOtp.findOne({ email: requestedEmail });
  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
  ) {
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute.",
    };
  }

  await userOtp.deleteMany({ email: requestedEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default getPendingUserOtp;
