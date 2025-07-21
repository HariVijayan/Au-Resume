import express from "express";
import User from "../../../models/user/user.js";
import ResumeData from "../../../models/pdf/resumeData.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

const ivLength = 12;

const deriveKey = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

router.post("/current-resume", async (req, res) => {
  try {
    let { resumeData, userPassword } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    const hashedPassword = crypto
      .createHash("sha256")
      .update(userPassword)
      .digest("hex");

    if (hashedPassword != user.password) {
      return res.status(400).json({
        message: "Unable to save the resume. Incorrect Password.",
      });
    }

    const encryptResume = async (resumeObj, password, saltBase64) => {
      const key = await deriveKey(password, Buffer.from(saltBase64, "base64"));
      const iv = crypto.randomBytes(ivLength);
      const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

      const plaintext = JSON.stringify(resumeObj);

      const encrypted = Buffer.concat([
        cipher.update(plaintext, "utf8"),
        cipher.final(),
      ]);
      const tag = cipher.getAuthTag();

      // Store all parts as base64 strings in one object, then stringify for DB storage
      const encryptedPayload = {
        iv: iv.toString("base64"),
        ciphertext: encrypted.toString("base64"),
        tag: tag.toString("base64"),
      };

      const encryptedResume = JSON.stringify(encryptedPayload);

      await ResumeData.deleteMany({ login_email: user.email });
      const resumeDataDBEntry = new ResumeData({
        login_email: user.email,
        encryptedResumeData: encryptedResume,
      });

      await resumeDataDBEntry.save();
    };

    encryptResume(resumeData, user.password, user.encryptionSalt);

    res.status(200).json({ message: "Resume Saved successfully." });
  } catch (err) {
    res.json({ message: "Failed to save the resume data.", err });
  }
});

export default router;
