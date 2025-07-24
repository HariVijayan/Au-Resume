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

    let session;
    let userAccountType = "";

    session = await adminCurrentSession.findOne({ userId, sessionId });

    if (session) {
      userAccountType = session.accountType;
    } else {
      session = await currentSession.findOne({ userId, sessionId });
    }

    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    if (userAccountType === "SuperAdmin") {
      res.json({ message: "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23" });
    } else if (userAccountType === "Admin") {
      res.json({ message: "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv" });
    } else if (userAccountType === "Analytics") {
      res.json({ message: "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo" });
    } else {
      res.json({ message: "Valid access token" });
    }
  } catch (error) {
    await addLogs(
      true,
      true,
      "System",
      "System",
      "Confidential",
      "P4",
      `Failed to check unprotected access. ${error}`
    );
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
