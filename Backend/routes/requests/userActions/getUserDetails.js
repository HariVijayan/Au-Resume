import express from "express";
import User from "../../../models/user/user.js";
import UserActiveSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";
import BadRequestError from "../../../middleware/httpStatusCodes/badRequest.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/getUserDetails",
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/userDetails/getUserDetails",
        "NO_ACCESS_TOKEN",
        "User details fetch attempt without access token",
        ``,
      );
      throw new BadRequestError("No token provided");
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
    );

    const session = await UserActiveSession.findOne({ userId, sessionId });
    if (!session) {
      logWarning(
        "/userDetails/getUserDetails",
        "SESSION_EXPIRED",
        "User details fetch attempt with expired session",
        ``,
      );
      throw new BadRequestError("Session expired. Please log in again");
    }

    const userEmail = session.email;

    if (session.expiresAt < Date.now()) {
      logWarning(
        "/userDetails/getUserDetails",
        "SESSION_EXPIRED",
        "User details fetch attempt with expired session",
        `email:  ${userEmail}`,
      );
      throw new BadRequestError("Session expired. Please log in again");
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      logWarning(
        "/userDetails/getUserDetails",
        "NOT_A_USER",
        "User details fetch attempt by invalid user",
        `email:  ${userEmail}`,
      );
      throw new UnauthorizedError("Unauthorised access. Not an user");
    }

    logInfo(
      "/user/approvals/getApprovalOtp",
      "USER_DETAILS_FETCH_SUCESS",
      "Successfully sent user's details",
      `email:  ${userEmail}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Otp sent to email successfully",
        timestamp: new Date().toISOString(),
      },
      otherData: {
        Email: user.email,
        RegNo: user.registerNumber,
        Dept: user.department,
        Course: user.courseType,
        Programme: user.programme,
        Branch: user.branch,
        Created: user.createdAtFormatted,
      },
    });
  }),
);

export default router;
