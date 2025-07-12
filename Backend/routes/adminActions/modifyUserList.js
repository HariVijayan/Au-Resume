import express from "express";
import adminUser from "../../models/admin/admin.js";
import UserDBModel from "../../models/user/user.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/get-final-users", async (req, res) => {
  const { modifyUserEmail, modifyUserRegNo } = req.body;

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
