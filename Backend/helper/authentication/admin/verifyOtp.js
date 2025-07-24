import adminOtp from "../../../models/admin/otp.js";
import addLogs from "../../functions/addLogs.js";

async function verifyAdminOtp(adminEmail, otpInput) {
  const storedOtp = await adminOtp.findOne({
    email: adminEmail,
    otp: otpInput,
  });

  if (!storedOtp) {
    await adminOtp.deleteMany({ email: adminEmail });
    await addLogs(
      true,
      true,
      adminEmail,
      adminEmail,
      "Public",
      "P4",
      "Incorrect otp verification."
    );
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp.",
    };
  }

  if (storedOtp.expiresAt < Date.now()) {
    await addLogs(
      true,
      true,
      adminEmail,
      adminEmail,
      "Public",
      "P4",
      "Expired otp provided for verification."
    );
    await adminOtp.deleteMany({ adminEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Otp expired.",
    };
  }

  await adminOtp.deleteMany({ email: adminEmail });

  await addLogs(
    true,
    false,
    adminEmail,
    adminEmail,
    "Public",
    "P4",
    "Successful otp verification."
  );

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyAdminOtp;
