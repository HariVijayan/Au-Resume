import express from "express";
import jwt from "jsonwebtoken";
import currentSession from "../../../Database_Models/currentSession.js";
import adminUser from "../../../Database_Models/adminUser.js";

const router = express.Router();

router.post("/check-admin-access", async (req, res) => {
  const { routeType } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const user = await adminUser.findOne({ _id: userId });
    if (!user) {
      return res.status(403).json({ message: "Not an admin." });
    }

    const session = await currentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    if (user.accountType != routeType) {
      res.status(401).json({ message: "Unauthorised Access Request." });
    }
  } catch (error) {
    console.error("Check Access Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
