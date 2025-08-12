import userOtp from "../../../models/user/otp.js";
import addLogs from "../../functions/addLogs.js";

async function verifyPendingUserOtp(requestedEmail, otpInput) {
  const storedOtp = await userOtp.findOne({
    email: requestedEmail,
    otp: otpInput,
  });
  if (!storedOtp) {
    await addLogs(
      false,
      true,
      requestedEmail,
      requestedEmail,
      "Public",
      "P4",
      "Incorrect otp verification."
    );
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp",
    };
  }

  if (storedOtp.expiresAt < Date.now()) {
    await addLogs(
      false,
      true,
      requestedEmail,
      requestedEmail,
      "Public",
      "P4",
      "Expired otp provided for verification."
    );
    await userOtp.deleteMany({ email: requestedEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "OTP expired",
    };
  }
  await userOtp.deleteMany({ email: requestedEmail });

  await addLogs(
    false,
    false,
    requestedEmail,
    requestedEmail,
    "Public",
    "P4",
    "Successful otp verification."
  );

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyPendingUserOtp;
