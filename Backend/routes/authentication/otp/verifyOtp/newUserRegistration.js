import express from "express";
import User from "../../../../models/user/user.js";
import pendingUser from "../../../../models/user/pendingUser.js";
import verifyPendingUserOtp from "../../../../helper/authentication/pendingUser/verifyOtp.js";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { userEmail, otpInput } = req.body;

  try {
    const accountAccessCheck = await checkPendingUserAccess(userEmail);
    if (accountAccessCheck.Valid === "NO") {
      return res
        .status(accountAccessCheck.HtmlCode)
        .json({ message: accountAccessCheck.Reason });
    }

    const otpVerification = await verifyPendingUserOtp(userEmail, otpInput);

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
      resumeEncryptionSalt: requestedAccount.resumeEncryptionSalt,
    });
    await verifiedUser.save();

    await pendingUser.deleteMany({ email: userEmail });

    res.json({
      message: "Registration complete. Redirecting to login page",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
