import express from "express";
import UserDBModel from "../../models/user/user.js";
import checkAdminAccess from "../../helper/checkAdminAccess.js";

const router = express.Router();

router.post("/get-final-users", async (req, res) => {
  const { modifyUserEmail, modifyUserRegNo } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    const adminCheck = await checkAdminAccess(accessToken);
    if (adminCheck.Valid === "NO") {
      return res
        .status(adminCheck.HtmlCode)
        .json({ message: adminCheck.Reason });
    }

    let finalUserList = [];

    const modifiableUser = await UserDBModel.findOne({
      email: modifyUserEmail,
      registerNumber: modifyUserRegNo,
    });

    if (!modifiableUser) {
      return res.status(400).json({ message: "No such user found." });
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
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
