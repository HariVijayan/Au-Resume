import express from "express";
import jwt from "jsonwebtoken";
import currentSession from "../../../models/user/currentSession.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import ForbiddenError from "../../../middleware/httpStatusCodes/forbidden.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/check-access",
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/verifySession/protectedRoutes/check-access",
        "NO_ACCESS_TOKEN",
        "Access attempt on protected route without access token",
        ``,
      );
      throw new UnauthorizedError("No token provided");
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
    );

    const adminSession = await adminCurrentSession.findOne({
      userId,
      sessionId,
    });
    if (adminSession) {
      if (adminSession.expiresAt < Date.now()) {
        logWarning(
          "/verifySession/protectedRoutes/check-access",
          "SESSION_EXPIRED",
          "Access attempt on protected route after session expired",
          `email: ${adminSession.email}`,
        );
        throw new ForbiddenError("Session expired. Log in again");
      }

      logInfo(
        "/verifySession/protectedRoutes/check-access",
        "SUCCESSFUL_ACCESS_CHECK",
        "Successful access verification on protected route",
        `email:  ${adminSession.email}`,
      );

      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "Valid access token",
          timestamp: new Date().toISOString(),
        },
      });
    } else {
      const userSession = await currentSession.findOne({ userId, sessionId });
      if (!userSession || userSession.expiresAt < Date.now()) {
        logWarning(
          "/verifySession/protectedRoutes/check-access",
          "SESSION_EXPIRED",
          "Access attempt on protected route after session expired",
          `email: ${userSession.email}`,
        );
        throw new ForbiddenError("Session expired. Log in again");
      }

      logInfo(
        "/verifySession/protectedRoutes/check-access",
        "SUCCESSFUL_ACCESS_CHECK",
        "Successful access verification on protected route",
        `email:  ${userSession.email}`,
      );

      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "Valid access token",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }),
);

export default router;
