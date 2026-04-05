import express from "express";
import currentSession from "../../models/user/currentSession.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";
import inputValidator from "../../helper/inputProcessing/schemas/authentication/logout.js";
import UnauthorizedError from "../../middleware/httpStatusCodes/unauthorised.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";
import asyncHandler from "../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/logout",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { userType } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/authenticateUser/logout",
        "NO_ACCESS_TOKEN",
        "Logout attempt without access token",
        "",
      );
      throw new UnauthorizedError("No access token provided");
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
    );

    let userSession;

    let userEmail;

    if (userType === "Admin") {
      userSession = await adminCurrentSession.findOne({ userId, sessionId });
      userEmail = userSession.email;
      await adminCurrentSession.deleteOne({ userId, sessionId });
    } else {
      userSession = await currentSession.findOne({ userId, sessionId });
      userEmail = userSession.email;
      await currentSession.deleteOne({ userId, sessionId });
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    logInfo(
      "/authenticateUser/logout",
      "LOGOUT_SUCCESS",
      "User logged out successfully",
      `email: ${userEmail}, type: ${userType}`,
    );

    return res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Logout successful",
        timestamp: new Date().toISOString(),
      },
    });
  }),
);

export default router;
