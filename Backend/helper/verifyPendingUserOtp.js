import pendingUser from "../models/user/pendingUser.js";
import userOtp from "../models/user/otp.js";

async function verifyPendingUserOtp(requestedEmail, otpInput) {
  const requestedAccount = await pendingUser.findOne({ email: requestedEmail });
  if (!requestedAccount) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "User not found or already verified",
    };
  }
  const lastOtp = await userOtp.findOne({
    email: requestedEmail,
    otp: otpInput,
  });
  if (!lastOtp) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp.",
    };
  }

  if (lastOtp.expiresAt < Date.now()) {
    await userOtp.deleteMany({ email: requestedEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "OTP expired.",
    };
  }
  await userOtp.deleteMany({ email: requestedEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
    PendingUser: requestedAccount,
  };
}

export default verifyPendingUserOtp;
