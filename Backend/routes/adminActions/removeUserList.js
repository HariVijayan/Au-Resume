import express from "express";
import userDBModel from "../../models/user/user.js";
import checkAdminAccess from "../components/checkAdminAccess.js";

const router = express.Router();

function csvToNumberArray(input) {
  const trimmedInput = input.replace(/\s+/g, "");
  const numArray = trimmedInput.split(",").map((value) => {
    const num = Number(value);
    if (isNaN(num)) {
      return null;
    }
    return num;
  });

  return numArray.filter((num) => num !== null);
}

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
    const adminCheck = await checkAdminAccess(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    let finalUserList = [];
    let skippableRegNoList = csvToNumberArray(skipRegNo);

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
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
