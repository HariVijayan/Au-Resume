import express from "express";
import UserDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/authentication/admin/checkAccess.js";
import addLogs from "../../helper/functions/addLogs.js";

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
    });

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
      `Failed to fetch user list for modification. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
