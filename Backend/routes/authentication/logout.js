import express from "express";
import currentSession from "../../models/user/currentSession.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";
import inputValidator from "../../helper/inputProcessing/schemas/authentication/logout.js";
import UnauthorizedError from "../../middleware/httpStatusCodes/unauthorised.js";
import { inputValidationErrorHandler } from "../../helper/inputProcessing/validationError.js";

const router = express.Router();

router.post(
  "/logout",
  inputValidator,
  inputValidationErrorHandler,
  async (req, res) => {
    const { userType } = req.body;
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
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

    res.status(200).json({
      success: true,
      responseDetails: {
        code: "SUCCESS",
        message: "Logout successful",
        timestamp: new Date().toISOString(),
      },
    });
  },
);

export default router;
