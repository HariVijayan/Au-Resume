import express from "express";
import UserDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/modifyUserList.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/get-final-users",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userEmail, userRegNo } = req.body;

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

    let finalUserList = [];

    const modifiableUser = await UserDBModel.findOne({
      email: userEmail,
      registerNumber: userRegNo,
    });

    if (!modifiableUser) {
      throw new BadRequestError("No such user found");
    }

    finalUserList.push({
      email: modifiableUser.email,
      registerNumber: modifiableUser.registerNumber,
      department: modifiableUser.department,
      courseType: modifiableUser.courseType,
      programme: modifiableUser.programme,
      branch: modifiableUser.branch,
      failedAttempt: modifiableUser.failedLoginAttempts,
      lockUntil: modifiableUser.lockUntilFormatted,
    });

    const cleanedUserList = finalUserList.map((user) => ({
      email: user.email,
      registerNumber: user.registerNumber,
      department: user.department,
      courseType: user.courseType,
      programme: user.programme,
      branch: user.branch,
      failedAttempt: user.failedAttempt,
      lockUntil: user.lockUntil ?? "N/A",
    }));

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Successfully created modifiable users list",
        timestamp: new Date().toISOString(),
      },
      otherData: {
        usersList: cleanedUserList,
      },
    });
  }),
);

export default router;
