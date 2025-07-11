import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";

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
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const session = await adminCurrentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    const adminEmail = session.email;

    const user = await adminUser.findOne({ email: adminEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
    }

    let finalUserList = [];
    let skippableRegNoList = csvToNumberArray(skipRegNo);

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
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
