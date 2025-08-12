import express from "express";
import User from "../../../../models/user/user.js";
import pendingUser from "../../../../models/user/pendingUser.js";
import verifyPendingUserOtp from "../../../../helper/authentication/pendingUser/verifyOtp.js";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";
import addLogs from "../../../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const accountAccessCheck = await checkPendingUserAccess(email);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpVerification = await verifyPendingUserOtp(email, otp);

    if (otpVerification.Valid === "NO") {
      return res
        .status(otpVerification.HtmlCode)
        .json({ message: otpVerification.Reason });
    }

    const requestedAccount = accountAccessCheck.PendingUser;
    const verifiedUser = new User({
      email: requestedAccount.email,
      password: requestedAccount.password,
      registerNumber: requestedAccount.registerNumber,
      department: requestedAccount.department,
      courseType: requestedAccount.courseType,
      programme: requestedAccount.programme,
      branch: requestedAccount.branch,
      encryptionSalt: requestedAccount.encryptionSalt,
    });
    await verifiedUser.save();

    await pendingUser.deleteMany({ email });

    await addLogs(
      false,
      false,
      email,
      email,
      "Public",
      "P4",
      `Verified email. Account creation completed successfully.`
    );

    res.json({
      message: "Registration complete. Redirecting to login page",
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to verify otp for new registration. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
