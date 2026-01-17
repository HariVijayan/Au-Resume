import userOtp from "../../../models/user/otp.js";

async function verifyPendingUserOtp(requestedEmail, otpInput) {
  const storedOtp = await userOtp.findOne({
    email: requestedEmail,
    otp: otpInput,
  });
  if (!storedOtp) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp",
    };
  }

  if (storedOtp.expiresAt < Date.now()) {
    await userOtp.deleteMany({ email: requestedEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "OTP expired",
    };
  }
  await userOtp.deleteMany({ email: requestedEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyPendingUserOtp;
