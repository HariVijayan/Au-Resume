import express from "express";
import jwt from "jsonwebtoken";
import currentSession from "../../../models/user/currentSession.js";
import adminCurrentSession from "../../../models/admin/currentSession.js";
import ForbiddenError from "../../../middleware/httpStatusCodes/forbidden.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import asyncHandler from "../../../middleware/asyncHandler.js";

const router = express.Router();

router.post(
  "/check-access",
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
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
        throw new ForbiddenError("Session expired. Log in again");
      }
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
        throw new ForbiddenError("Session expired. Log in again");
      }
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
