import express from "express";
import User from "../../models/user/user.js";
import adminUser from "../../models/admin/admin.js";
import currentSession from "../../models/user/currentSession.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import istDateFormat from "../../helper/functions/dateIstFormat.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password, rememberMe, isAdmin } = req.body;

  try {
    let user;

    if (isAdmin) {
      user = await adminUser.findOne({ email });
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: "User dosen't exist" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingLockTime = Math.ceil(
        (user.lockUntil - Date.now()) / 60000,
      );
      return res.status(403).json({
        message: `Account locked. Try again in ${remainingLockTime} minutes`,
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= process.env.MAX_FAILED_LOGINS) {
        user.lockUntil = new Date(
          Date.now() + process.env.ACCOUNT_LOCK_TIME * 1000,
        );
        user.lockUntilFormatted = istDateFormat(user.lockUntil);

        await user.save();
        return res.status(403).json({
          message: "Too many failed attempts. Account locked for 30 minutes",
        });
      }

      await user.save();
      return res.status(400).json({ message: "Invalid email or password" });
    }

    user.failedLoginAttempts = 0;
    user.lockUntil = null;
    user.lockUntilFormatted = null;
    await user.save();

    const sessionId = uuidv4();
    const createdAt = new Date();
    const createdAtFormatted = istDateFormat(createdAt);
    const expiresAt = new Date(
      Date.now() +
        (rememberMe
          ? process.env.CURREN_SESSION_REMEMBERME_EXPIRY
          : process.env.CURRENT_SESSION_EXPIRY) *
          1000,
    );
    const expiresAtFormatted = istDateFormat(expiresAt);

    if (isAdmin) {
      await adminCurrentSession.deleteMany({ email: user.email });

      await adminCurrentSession.create({
        userId: user._id,
        email: user.email,
        accountType: user.accountType,
        sessionId: sessionId,
        createdAt,
        createdAtFormatted,
        expiresAt,
        expiresAtFormatted,
      });
    } else {
      await currentSession.deleteMany({ email: user.email });

      await currentSession.create({
        userId: user._id,
        email: user.email,
        sessionId: sessionId,
        createdAt,
        createdAtFormatted,
        expiresAt,
        expiresAtFormatted,
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id, sessionId },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "2d" : "1d" },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: rememberMe ? 2 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    if (user.accountType === "SuperAdmin") {
      res.json({ message: "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23" });
    } else if (user.accountType === "Admin") {
      res.json({ message: "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv" });
    } else if (user.accountType === "Analytics") {
      res.json({ message: "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo" });
    } else {
      res.json({ message: "Login successful" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
