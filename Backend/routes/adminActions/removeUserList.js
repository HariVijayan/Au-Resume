import express from "express";
import userDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/get-final-users", async (req, res) => {
  const {
    opertationType,
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    skipRegNo,
    remUserEmail,
    remUserRegNo,
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

    if (opertationType === "Single") {
      const removableUser = await userDBModel.findOne({
        email: remUserEmail,
        registerNumber: remUserRegNo,
      });

      if (!removableUser) {
        return res.status(400).json({ message: "User not found" });
      }

      finalUserList.push({
        email: remUserEmail,
        registerNumber: remUserRegNo,
        department: removableUser.department,
        courseType: removableUser.courseType,
        programme: removableUser.programme,
        branch: removableUser.branch,
      });
    } else if (opertationType === "Multiple") {
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
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to fetch user list for removal. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
