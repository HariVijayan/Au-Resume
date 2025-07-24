import adminOtp from "../../../models/admin/otp.js";
import userOtp from "../../../models/user/otp.js";
import addLogs from "../../functions/addLogs.js";

async function getUserAndAdminOtp(requestedEmail, isAdmin) {
  let lastOtp;

  if (isAdmin) {
    lastOtp = await adminOtp.findOne({ email: requestedEmail });
  } else {
    lastOtp = await userOtp.findOne({ email: requestedEmail });
  }

  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
  ) {
    if (isAdmin) {
      await addLogs(
        true,
        true,
        requestedEmail,
        requestedEmail,
        "Confidential",
        "P1",
        "Too many OTP requests. Potential DOS attack."
      );
    } else {
      await addLogs(
        false,
        true,
        requestedEmail,
        requestedEmail,
        "Confidential",
        "P1",
        "Too many OTP requests. Potential DOS attack."
      );
    }
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute.",
    };
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
      "Successfully generated otp."
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
      "Successfully generated otp."
    );
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default getUserAndAdminOtp;
