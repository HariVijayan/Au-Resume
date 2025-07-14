import express from "express";
import User from "../../../../models/user/user.js";
import pendingUser from "../../../../models/user/pendingUser.js";
import verifyPendingUserOtp from "../../../components/verifyPendingUserOtp.js";

const router = express.Router();

router.post("/registration", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const accountCheck = await verifyPendingUserOtp(email, otp);
    if (accountCheck.Valid === "NO") {
      return res
        .status(accountCheck.HtmlCode)
        .json({ message: accountCheck.Reason });
    }

    const requestedAccount = accountCheck.PendingUser;
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

    res.json({
      message: "OTP verified. Registration complete. You can now login.",
    });
  } catch (error) {
    console.error("OTP Verification error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
