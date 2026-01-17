import express from "express";
import UserDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";

const router = express.Router();

router.post("/get-final-users", async (req, res) => {
  const { modifyUserEmail, modifyUserRegNo } = req.body;

  try {
    const accessToken = req.cookies.accessToken;

    const adminAccessCheck = await checkAdminAccess(accessToken);
    if (adminAccessCheck.Valid === "NO") {
      return res
        .status(adminAccessCheck.HtmlCode)
        .json({ message: adminAccessCheck.Reason });
    }

    let finalUserList = [];

    const modifiableUser = await UserDBModel.findOne({
      email: modifyUserEmail,
      registerNumber: modifyUserRegNo,
    });

    if (!modifiableUser) {
      return res.status(400).json({ message: "No such user found" });
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

    res.json({
      usersList: cleanedUserList,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
