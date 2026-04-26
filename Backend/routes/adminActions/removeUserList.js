import express from "express";
import userDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/removeUserList.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import BadRequestError from "../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/get-final-users",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      removalType,
      commonEmailSuffix,
      commonRegNoPrefix,
      commonRegNoStart,
      commonRegNoEnd,
      skipRegNo,
      userEmail,
      userRegNo,
    } = req.body;

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
    let skippableRegNoList = csvToArray(skipRegNo);

    if (removalType === "Single") {
      const removableUser = await userDBModel.findOne({
        email: userEmail,
        registerNumber: userRegNo,
      });

      if (!removableUser) {
        logWarning(
        "/admin/userMgmt/removeUser/get-final-users",
        "INVALID_USER",
        "No such user found.",
        `email: ${userEmail} doesn't exist`,
      );
        throw new BadRequestError("User not found");
      }

      finalUserList.push({
        email: userEmail,
        registerNumber: userRegNo,
        department: removableUser.department,
        courseType: removableUser.courseType,
        programme: removableUser.programme,
        branch: removableUser.branch,
      });
    } else if (removalType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;
        const newUserRegNoEmail = `${regNo}${commonEmailSuffix}`;

        const removableUser = await userDBModel.findOne({
          email: newUserRegNoEmail,
          registerNumber: regNo,
        });

        if (removableUser) {
          finalUserList.push({
            email: newUserRegNoEmail,
            registerNumber: regNo,
            department: removableUser.department,
            courseType: removableUser.courseType,
            programme: removableUser.programme,
            branch: removableUser.branch,
          });
        }
      }
    }

    logInfo(
      "/admin/userMgmt/removeUser/get-final-users",
      "FETCH_USER_LIST_SUCCESS",
      "Successfully created removable users list",
      ``,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Successfully created removable users list",
        timestamp: new Date().toISOString(),
      },
      otherData: {
        usersList: finalUserList,
      },
    });
  }),
);

export default router;
