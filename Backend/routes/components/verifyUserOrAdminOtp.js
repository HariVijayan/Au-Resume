import admin from "../../models/admin/admin.js";
import user from "../../models/user/user.js";
import adminOtp from "../../models/admin/otp.js";
import userOtp from "../../models/user/otp.js";

async function verifyUserOrAdminOtp(requestedEmail, isAdmin, otpInput) {
  let requestedAccount;
  if (isAdmin) {
    requestedAccount = await admin.findOne({ email: requestedEmail });
  } else {
    requestedAccount = await user.findOne({ email: requestedEmail });
  }

  if (!requestedAccount) {
    return { Valid: "NO", HtmlCode: 404, Reason: "User not found." };
  }

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
      Reason: "Invalid Otp.",
    };
  }

  if (lastOtp.expiresAt < Date.now()) {
    if (isAdmin) {
      await adminOtp.deleteMany({ email: requestedEmail });
    } else {
      await userOtp.deleteMany({ email: requestedEmail });
    }
    return { Valid: "NO", HtmlCode: 400, Reason: "OTP expired." };
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
