import express from "express";
import User from "../../../models/user/user.js";
import UserActiveSession from "../../../models/user/currentSession.js";
import addLogs from "../../../helper/functions/addLogs.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/getUserDetails", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      await addLogs(
        true,
        true,
        "System",
        "System",
        "Confidential",
        "P1",
        "Access attempt without access token. Potential phising attempt."
      );
      return { Valid: "NO", HtmlCode: 400, Reason: "No token provided" };
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const session = await UserActiveSession.findOne({ userId, sessionId });
    if (!session) {
      await addLogs(
        true,
        true,
        "System",
        "System",
        "Confidential",
        "P1",
        "Access attempt without current active session. Potential access token theft."
      );
      return {
        Valid: "NO",
        HtmlCode: 400,
        Reason: "Session expired. Please log in again.",
      };
    }

    const userEmail = session.email;

    if (session.expiresAt < Date.now()) {
      await addLogs(
        true,
        true,
        userEmail,
        userEmail,
        "Confidential",
        "P3",
        "Access attempt with expired session."
      );
      return {
        Valid: "NO",
        HtmlCode: 400,
        Reason: "Session expired. Please log in again.",
      };
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      await addLogs(
        true,
        true,
        userEmail,
        userEmail,
        "Confidential",
        "P1",
        "Access attempt without an user account. Potential phising attempt."
      );
      return {
        Valid: "NO",
        HtmlCode: 403,
        Reason: "Unauthorised access. Not an user.",
      };
    }

    res.json({
      Email: user.email,
      RegNo: user.registerNumber,
      Dept: user.department,
      Course: user.courseType,
      Programme: user.programme,
      Branch: user.branch,
      Created: user.createdAtFormatted,
    });
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to fetch user details. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
