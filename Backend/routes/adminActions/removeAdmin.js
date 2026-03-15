import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import adminOtp from "../../models/admin/otp.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import verifyAdminOtp from "../../helper/authentication/admin/verifyOtp.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/removeAdmin.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/removeAdmin",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { adminEmail, adminType, otpInput } = req.body;

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

    const approvingAdminEmail = adminAccessCheck.otherData.AdminEmail;

    const adminOtpVerification = await verifyAdminOtp(
      approvingAdminEmail,
      otpInput,
    );

    if (!adminOtpVerification.success) {
      return res.status(adminOtpVerification.responseDetails.statusCode).json({
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
      throw new BadRequestError("No such admin found");
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

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Successfully removed admin",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
