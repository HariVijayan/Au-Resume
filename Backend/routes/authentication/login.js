import express from "express";
import User from "../../models/user/user.js";
import adminUser from "../../models/admin/admin.js";
import currentSession from "../../models/user/currentSession.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

const MAX_ATTEMPTS = 5;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .replace(",", "");
};

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
      return res.status(400).json({ message: "User dosen't exist." });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const remainingLockTime = Math.ceil(
        (user.lockUntil - Date.now()) / 60000
      );
      return res.status(403).json({
        message: `Account locked. Try again in ${remainingLockTime} minutes.`,
      });
    }

    const hashedInputPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    if (hashedInputPassword !== user.password) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        user.lockUntilFormatted = formatISTTimestamp(user.lockUntil);
        await user.save();
        return res.status(403).json({
          message: "Too many failed attempts. Account locked for 30 minutes.",
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
    const expiresAt = new Date(
      Date.now() + (rememberMe ? 2 : 1) * 24 * 60 * 60 * 1000
    );

    if (isAdmin) {
      await adminCurrentSession.deleteMany({ email: user.email });

      await adminCurrentSession.create({
        userId: user._id,
        email: user.email,
        accountType: user.accountType,
        sessionId: sessionId,
        createdAt: createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt: expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
      });
    } else {
      await currentSession.deleteMany({ userId: user._id });

      await currentSession.create({
        userId: user._id,
        email: user.email,
        sessionId: sessionId,
        createdAt: createdAt,
        createdAtFormatted: formatISTTimestamp(createdAt),
        expiresAt: expiresAt,
        expiresAtFormatted: formatISTTimestamp(expiresAt),
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id, sessionId },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "2d" : "1d" }
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
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
