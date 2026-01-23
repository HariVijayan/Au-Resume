import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/addUserList.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/get-final-users",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
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

    try {
      const accessToken = req.cookies.accessToken;

      const adminAccessCheck = await checkAdminAccess(accessToken);
      if (adminAccessCheck.Valid === "NO") {
        return res
          .status(adminAccessCheck.HtmlCode)
          .json({ message: adminAccessCheck.Reason });
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

      res.json({
        usersList: finalUserList,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
