import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/addUserList.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import {  logInfo } from "../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/get-final-users",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const {
      additionType,
      commonEmailSuffix,
      commonRegNoPrefix,
      commonRegNoStart,
      commonRegNoEnd,
      skipRegNo,
      commonUserDept,
      commonUserCourseType,
      commonUserProgramme,
      commonUserBranch,
      userEmail,
      userRegNo,
      userDept,
      userCourseType,
      userProgramme,
      userBranch,
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

    if (additionType === "Single") {
      finalUserList.push({
        email: userEmail,
        registerNumber: userRegNo,
        department: userDept,
        courseType: userCourseType,
        programme: userProgramme,
        branch: userBranch,
      });
    } else if (additionType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;

        finalUserList.push({
          email: `${regNo}${commonEmailSuffix}`,
          registerNumber: regNo,
          department: commonUserDept,
          courseType: commonUserCourseType,
          programme: commonUserProgramme,
          branch: commonUserBranch,
        });
      }
    }

    logInfo(
        "/admin/userMgmt/addUser/get-final-users",
        "FETCH_USER_LIST_SUCCESS",
        "Successfully created new users list",
        ``,
      );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: `Successfully created new users list`,
        timestamp: new Date().toISOString(),
      },
      otherData: {
        usersList: finalUserList,
      },
    });
  }),
);

export default router;
