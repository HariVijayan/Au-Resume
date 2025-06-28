import express from "express";
import jwt from "jsonwebtoken";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import adminUser from "../../../models/admin/admin.js";

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

    const session = await adminCurrentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    const user = await adminUser.findOne({ email: session.email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
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
