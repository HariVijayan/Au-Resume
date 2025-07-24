import adminOtp from "../../../models/admin/otp.js";
import addLogs from "../../functions/addLogs.js";

async function getAdminOtp(adminEmail) {
  const lastOtp = await adminOtp.findOne({ adminEmail });

  if (
    lastOtp &&
    Date.now() - lastOtp.createdAt.getTime() < process.env.OTP_REQUEST_LIMIT
  ) {
    await addLogs(
      true,
      true,
      adminEmail,
      adminEmail,
      "Confidential",
      "P1",
      "Too many OTP requests. Potential DOS attack."
    );
    return {
      Valid: "NO",
      HtmlCode: 429,
      Reason: "Too many OTP requests. Try again in 1 minute.",
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
    "Successfully generated otp."
  );

  return {
    Valid: "YES",
    HtmlCode: 200,
    AdminAccount: admin,
    AdminEmail: adminEmail,
  };
}

export default getAdminOtp;
