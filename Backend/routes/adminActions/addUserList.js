import express from "express";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import csvToArray from "../../helper/functions/csvToArray.js";
import addLogs from "../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/get-final-users", async (req, res) => {
  const {
    newAdditionType,
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    skipRegNo,
    commonUserDept,
    commonUserCourseType,
    commonUserProgramme,
    commonUserBranch,
    newUserEmail,
    newUserRegNo,
    newUserDept,
    newUserCourseType,
    newUserProgramme,
    newUserBranch,
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

    if (newAdditionType === "Single") {
      finalUserList.push({
        email: newUserEmail,
        registerNumber: newUserRegNo,
        department: newUserDept,
        courseType: newUserCourseType,
        programme: newUserProgramme,
        branch: newUserBranch,
      });
    } else if (newAdditionType === "Multiple") {
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
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to fetch user list for user addition. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
