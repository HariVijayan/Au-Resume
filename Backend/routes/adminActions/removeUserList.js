import express from "express";
import userDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import inputValidator from "../../helper/inputProcessing/schemas/adminActions/removeUserList.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/get-final-users",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
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

      if (removalType === "Single") {
        const removableUser = await userDBModel.findOne({
          email: userEmail,
          registerNumber: userRegNo,
        });

        if (!removableUser) {
          return res.status(400).json({ message: "User not found" });
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

      res.json({
        usersList: finalUserList,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },
);

export default router;
