import adminOtp from "../../../models/admin/otp.js";
import userOtp from "../../../models/user/otp.js";
import addLogs from "../../functions/addLogs.js";

async function verifyUserOrAdminOtp(requestedEmail, isAdmin, otpInput) {
  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail, otp: otpInput });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail, otp: otpInput });
  }

  if (!lastOtp) {
    if (isAdmin) {
      await addLogs(
        true,
        true,
        requestedEmail,
        requestedEmail,
        "Public",
        "P4",
        "Incorrect otp verification."
      );
    } else {
      await addLogs(
        false,
        true,
        requestedEmail,
        requestedEmail,
        "Public",
        "P4",
        "Incorrect otp verification."
      );
    }
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp",
    };
  }

  if (lastOtp.expiresAt < Date.now()) {
    if (isAdmin) {
      await adminOtp.deleteMany({ email: requestedEmail });
      await addLogs(
        true,
        true,
        requestedEmail,
        requestedEmail,
        "Public",
        "P4",
        "Expired otp provided for verification."
      );
    } else {
      await userOtp.deleteMany({ email: requestedEmail });
      await addLogs(
        false,
        true,
        requestedEmail,
        requestedEmail,
        "Public",
        "P4",
        "Expired otp provided for verification."
      );
    }
    return { Valid: "NO", HtmlCode: 400, Reason: "OTP expired" };
  }

  if (isAdmin) {
    await adminOtp.deleteMany({ email: requestedEmail });
    await addLogs(
      true,
      false,
      requestedEmail,
      requestedEmail,
      "Public",
      "P4",
      "Successful otp verification."
    );
  } else {
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
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyUserOrAdminOtp;
