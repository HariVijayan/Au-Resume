import adminOtp from "../../../models/admin/otp.js";
import userOtp from "../../../models/user/otp.js";

async function verifyUserOrAdminOtp(requestedEmail, isAdmin, otpInput) {
  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail, otp: otpInput });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail, otp: otpInput });
  }

  if (!lastOtp) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp",
    };
  }

  if (lastOtp.expiresAt < Date.now()) {
    if (isAdmin) {
      await adminOtp.deleteMany({ email: requestedEmail });
    } else {
      await userOtp.deleteMany({ email: requestedEmail });
    }
    return { Valid: "NO", HtmlCode: 400, Reason: "OTP expired" };
  }

  if (isAdmin) {
    await adminOtp.deleteMany({ email: requestedEmail });
  } else {
    await userOtp.deleteMany({ email: requestedEmail });
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyUserOrAdminOtp;
