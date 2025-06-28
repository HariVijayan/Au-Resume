import express from "express";
import ResumeData from "../../../models/pdf/resumeData.js";
import User from "../../../models/user/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

// Derive key from password and salt
const deriveKey = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

router.post("/resume-details", async (req, res) => {
  try {
    let { userPassword } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken)
      return res.status(401).json({ message: "No access token provided" });
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(401).json({ message: "No user" });
    const hashedPassword = crypto
      .createHash("sha256")
      .update(userPassword)
      .digest("hex");

    if (hashedPassword != user.password) {
      return res.status(400).json({
        message: "Unable to fetch the resume. Incorrect Password.",
      });
    }
    const resumeData = await ResumeData.findOne({
      login_email: user.email,
    });
    if (!resumeData)
      return res.status(404).json({ message: "No previous records found" });

    const decryptResume = async (encryptedStr, password, saltBase64) => {
      const key = await deriveKey(password, Buffer.from(saltBase64, "base64"));

      let encryptedPayload;
      try {
        encryptedPayload = JSON.parse(encryptedStr);
      } catch {
        return res.status(410).json({
          message: "Resume details corrupted. Please save a new one.",
        });
      }

      const iv = Buffer.from(encryptedPayload.iv, "base64");
      const ciphertext = Buffer.from(encryptedPayload.ciphertext, "base64");
      const tag = Buffer.from(encryptedPayload.tag, "base64");

      const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
      decipher.setAuthTag(tag);

      const decrypted = Buffer.concat([
        decipher.update(ciphertext),
        decipher.final(),
      ]);

      const plaintext = decrypted.toString("utf8");

      const decryptedResume = JSON.parse(plaintext);

      res.status(200).json(decryptedResume);
    };

    decryptResume(
      resumeData.encryptedResumeData,
      user.password,
      user.encryptionSalt
    );
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch previous records" });
  }
});

export default router;
