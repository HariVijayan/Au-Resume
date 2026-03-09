import express from "express";
import User from "../../../../models/user/user.js";
import pendingUser from "../../../../models/user/pendingUser.js";
import verifyPendingUserOtp from "../../../../helper/authentication/pendingUser/verifyOtp.js";
import checkPendingUserAccess from "../../../../helper/authentication/pendingUser/checkAccess.js";
import inputValidator from "../../../../helper/inputProcessing/schemas/authentication/otp/verifyOtp/newUserRegistration.js";
import { inputValidationErrorHandler } from "../../../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/registration",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { userEmail, otpInput } = req.body;

    try {
      const accountAccessCheck = await checkPendingUserAccess(userEmail);
      if (!accountAccessCheck.success) {
        return res.status(accountAccessCheck.responseDetails.statusCode).json({
          success: false,
          responseDetails: {
            code: accountAccessCheck.responseDetails.code,
            message: accountAccessCheck.responseDetails.message,
            timestamp: accountAccessCheck.responseDetails.timestamp,
          },
        });
      }

      const otpVerification = await verifyPendingUserOtp(userEmail, otpInput);

      if (!otpVerification.success) {
        return res.status(otpVerification.responseDetails.statusCode).json({
          success: false,
          responseDetails: {
            code: otpVerification.responseDetails.code,
            message: otpVerification.responseDetails.message,
            timestamp: otpVerification.responseDetails.timestamp,
          },
        });
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
  },
);

export default router;
