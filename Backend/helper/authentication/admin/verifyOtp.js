import adminOtp from "../../../models/admin/otp.js";

async function verifyAdminOtp(adminEmail, otpInput) {
  const storedOtp = await adminOtp.findOne({
    email: adminEmail,
    otp: otpInput,
  });

  if (!storedOtp) {
    await adminOtp.deleteMany({ email: adminEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Invalid Otp",
    };
  }

  if (storedOtp.expiresAt < Date.now()) {
    await adminOtp.deleteMany({ adminEmail });
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "Otp expired",
    };
  }

  await adminOtp.deleteMany({ email: adminEmail });

  return {
    Valid: "YES",
    HtmlCode: 200,
  };
}

export default verifyAdminOtp;
