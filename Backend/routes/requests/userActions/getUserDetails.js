import express from "express";
import User from "../../../models/user/user.js";
import UserActiveSession from "../../../models/user/currentSession.js";
import jwt from "jsonwebtoken";
import BadRequestError from "../../../middleware/httpStatusCodes/badRequest.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";

const router = express.Router();

router.post("/getUserDetails", async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new BadRequestError("No token provided");
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET,
    );

    const session = await UserActiveSession.findOne({ userId, sessionId });
    if (!session) {
      throw new BadRequestError("Session expired. Please log in again");
    }

    const userEmail = session.email;

    if (session.expiresAt < Date.now()) {
      throw new BadRequestError("Session expired. Please log in again");
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new UnauthorizedError("Unauthorised access. Not an user");
    }

    res.json({
      Email: user.email,
      RegNo: user.registerNumber,
      Dept: user.department,
      Course: user.courseType,
      Programme: user.programme,
      Branch: user.branch,
      Created: user.createdAtFormatted,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
