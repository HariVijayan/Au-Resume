import express from "express";
import User from "../../../models/user/user.js";
import ResumeData from "../../../models/pdf/resumeData.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";

import inputValidator from "../../../helper/inputProcessing/schemas/requests/pdf/saveResume.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import BadRequestError from "../../../middleware/httpStatusCodes/badRequest.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

const ivLength = 12;

const deriveKey = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

router.post(
  "/current-resume",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    let { resumeData, userPassword } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/saveResume/current-resume",
        "NO_ACCESS_TOKEN",
        "Save resume details attempt without access token",
        ``,
      );
      throw new UnauthorizedError("No access token provided");
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      logWarning(
        "/saveResume/current-resume",
        "NOT_A_USER",
        "Save resume details attempt by invalid user",
        ``,
      );
      throw new UnauthorizedError("Unauthorized access");
    }

    const passwordMatches = await bcrypt.compare(userPassword, user.password);

    if (!passwordMatches) {
      logWarning(
        "/saveResume/current-resume",
        "NOT_A_USER",
        "Save resume details attempt with invalid password",
        `email: ${user.email}`,
      );
      throw new BadRequestError(
        "Unable to fetch the resume. Incorrect Password",
      );
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

    encryptResume(resumeData, user.password, user.resumeEncryptionSalt);

    logInfo(
      "/saveResume/current-resume",
      "RESUME_SAVE_SUCCESS",
      "Successfully saved user's resume data",
      `email:  ${user.email}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Resume Saved successfully",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
