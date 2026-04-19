import express from "express";
import ResumeData from "../../../models/pdf/resumeData.js";
import User from "../../../models/user/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import bcrypt from "bcrypt";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/pdf/getPreviousResume.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import BadRequestError from "../../../middleware/httpStatusCodes/badRequest.js";
import NotFoundError from "../../../middleware/httpStatusCodes/notFound.js";
import ExpectationFailedError from "../../../middleware/httpStatusCodes/expectationFailed.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

// Derive key from password and salt
const deriveKey = (password, salt) =>
  new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) return reject(err);
      resolve(key);
    });
  });

router.post(
  "/resume-details",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    let { userPassword } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/getPrevious/resume-details",
        "NO_ACCESS_TOKEN",
        "Fetch previous resume details attempt without access token",
        ``,
      );
      throw new UnauthorizedError("No access token provided");
    }
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      logWarning(
        "/getPrevious/resume-details",
        "NOT_A_USER",
        "Fetch previous resume details attempt by invalid user",
        ``,
      );
      throw new UnauthorizedError("Unauthorized access");
    }
    const passwordMatches = await bcrypt.compare(userPassword, user.password);

    if (!passwordMatches) {
      logWarning(
        "/getPrevious/resume-details",
        "NOT_A_USER",
        "Fetch previous resume details attempt with invalid password",
        `email: ${user.email}`,
      );
      throw new BadRequestError(
        "Unable to fetch the resume. Incorrect Password",
      );
    }
    const resumeData = await ResumeData.findOne({
      login_email: user.email,
    });
    if (!resumeData) {
      logWarning(
        "/getPrevious/resume-details",
        "NO_RECORDS_FOUND",
        "Fetch previous resume details attempt returned no results",
        `email: ${user.email}`,
      );
      throw new NotFoundError("No previous records found");
    }

    const decryptResume = async (encryptedStr, password, saltBase64) => {
      const key = await deriveKey(password, Buffer.from(saltBase64, "base64"));

      let encryptedPayload;
      try {
        encryptedPayload = JSON.parse(encryptedStr);
      } catch {
        logWarning(
          "/getPrevious/resume-details",
          "DECRYPTION_FAILED",
          "Failed to decrypt previously stored user's resume details",
          `email: ${user.email}`,
        );
        throw new ExpectationFailedError(
          "Resume details corrupted. Please save a new one",
        );
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

      logInfo(
        "/getPrevious/resume-details",
        "STORED_RESUME_FETCH_SUCCESS",
        "Successfully fetched previously stored resume data",
        `email:  ${user.email}`,
      );

      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "Successfully fetched previous resume",
          timestamp: new Date().toISOString(),
        },
        otherData: {
          resumeData: decryptedResume,
        },
      });
    };

    decryptResume(
      resumeData.encryptedResumeData,
      user.password,
      user.resumeEncryptionSalt,
    );
  }),
);

export default router;
