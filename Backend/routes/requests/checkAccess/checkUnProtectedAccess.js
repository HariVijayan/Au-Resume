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

    let session;
    let userAccountType = "";

    session = await adminCurrentSession.findOne({ userId, sessionId });

    if (session) {
      userAccountType = session.accountType;
    } else {
      session = await currentSession.findOne({ userId, sessionId });
    }

    if (!session || session.expiresAt < Date.now()) {
      throw new ForbiddenError("Session expired. Log in again");
    }

    if (userAccountType === "SuperAdmin") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23",
          timestamp: new Date().toISOString(),
        },
      });
    } else if (userAccountType === "Admin") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv",
          timestamp: new Date().toISOString(),
        },
      });
    } else if (userAccountType === "Analytics") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo",
          timestamp: new Date().toISOString(),
        },
      });
    } else {
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
