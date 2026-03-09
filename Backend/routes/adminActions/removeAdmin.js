import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/removeAdmin.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/removeAdmin",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { adminEmail, adminType, otpInput } = req.body;

    try {
      const accessToken = req.cookies.accessToken;

      const adminAccessCheck = await checkAdminAccess(accessToken);
      if (!adminAccessCheck.success) {
        return res.status(adminAccessCheck.responseDetails.statusCode).json({
          success: false,
          responseDetails: {
            code: adminAccessCheck.responseDetails.code,
            message: adminAccessCheck.responseDetails.message,
            timestamp: adminAccessCheck.responseDetails.timestamp,
          },
        });
      }

      const approvingAdminEmail = adminAccessCheck.AdminEmail;

      const adminOtpVerification = await verifyAdminOtp(
        approvingAdminEmail,
        otpInput,
      );

      if (!adminOtpVerification.success) {
        return res
          .status(adminOtpVerification.responseDetails.statusCode)
          .json({
            success: false,
            responseDetails: {
              code: adminOtpVerification.responseDetails.code,
              message: adminOtpVerification.responseDetails.message,
              timestamp: adminOtpVerification.responseDetails.timestamp,
            },
          });
      }

      const removeAdmin = await adminUser.findOne({
        email: adminEmail,
        accountType: adminType,
      });

      if (!removeAdmin) {
        return res.status(400).json({ message: "No such admin found" });
      }

      const existingSessions = await adminCurrentSession.find({
        email: adminEmail,
      });

      if (existingSessions) {
        await adminCurrentSession.deleteMany({
          email: adminEmail,
        });
      }

      const existingOtp = await adminOtp.find({
        email: adminEmail,
      });

      if (existingOtp) {
        await adminOtp.deleteMany({
          email: adminEmail,
        });
      }

      await adminUser.deleteOne({ email: adminEmail, accountType: adminType });

      res.json({
        message: "Admin removed successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
