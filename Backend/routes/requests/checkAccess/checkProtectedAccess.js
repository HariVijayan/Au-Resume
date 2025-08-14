import express from "express";
import jwt from "jsonwebtoken";
import currentSession from "../../../models/user/currentSession.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import addLogs from "../../../helper/functions/addLogs.js";

const router = express.Router();

router.post("/check-access", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return res.status(401).json({ message: "No token provided" });

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const adminSession = await adminCurrentSession.findOne({
      userId,
      sessionId,
    });
    if (adminSession) {
      if (adminSession.expiresAt < Date.now()) {
        return res
          .status(403)
          .json({ message: "Session expired. Log in again" });
      }
      res.status(200).json({ message: "Valid access token" });
    } else {
      const userSession = await currentSession.findOne({ userId, sessionId });
      if (!userSession || userSession.expiresAt < Date.now()) {
        return res
          .status(403)
          .json({ message: "Session expired. Log in again" });
      }
      res.status(200).json({ message: "Valid access token" });
    }
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to check protected route access. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
