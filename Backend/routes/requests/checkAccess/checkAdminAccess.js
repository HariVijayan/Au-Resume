import express from "express";
import checkAdminAccess from "../../../helper/authentication/admin/checkAccess.js";
import inputValidator from "../../../helper/inputProcessing/schemas/requests/checkAccess/checkAdminAccess.js";
import { inputValidationErrorHandler } from "../../../helper/inputProcessing/validationError.js";
import UnauthorizedError from "../../../middleware/httpStatusCodes/unauthorised.js";
import asyncHandler from "../../../middleware/asyncHandler.js";
import { logWarning, logInfo } from "../../../helper/functions/systemLogger.js";

const router = express.Router();

router.post(
  "/check-admin-access",
  inputValidator,
  inputValidationErrorHandler,
  asyncHandler(async (req, res) => {
    const { routeType } = req.body;

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      logWarning(
        "/verifyAdminSession/check-admin-access",
        "NO_ACCESS_TOKEN",
        "Access attempt on admin route without access token",
        ``,
      );
      throw new UnauthorizedError("No token provided");
    }
    const adminCheck = await checkAdminAccess(accessToken);

    if (!adminCheck.success) {
      return res.status(adminCheck.responseDetails.statusCode).json({
        success: false,
        responseDetails: {
          code: adminCheck.responseDetails.code,
          message: adminCheck.responseDetails.message,
          timestamp: adminCheck.responseDetails.timestamp,
        },
      });
    }

    const adminAccount = adminCheck.otherData.AdminAccount;

    if (
      routeType === "SuperAdmin" &&
      adminAccount.accountType != "SuperAdmin"
    ) {
      logWarning(
        "/verifyAdminSession/check-admin-access",
        "UNAUTHORISED_ACCESS_ATTEMPT",
        "Unauthorised access attempt on an admin route",
        `email: ${adminAccount.email}`,
      );
      throw new UnauthorizedError("Unauthorised Access Request");
    }
    if (routeType === "Admin" && adminAccount.accountType === "Analytics") {
      logWarning(
        "/verifyAdminSession/check-admin-access",
        "UNAUTHORISED_ACCESS_ATTEMPT",
        "Unauthorised access attempt on an admin route",
        `email: ${adminAccount.email}`,
      );
      throw new UnauthorizedError("Unauthorised Access Request");
    }

    logInfo(
      "/verifyAdminSession/check-admin-access",
      "SUCCESSFUL_ADMIN_ACCESS_CHECK",
      "Successful access verification on admin route",
      `email:  ${adminAccount.email}`,
    );

    if (adminAccount.accountType === "SuperAdmin") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23",
          timestamp: new Date().toISOString(),
        },
      });
    } else if (adminAccount.accountType === "Admin") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv",
          timestamp: new Date().toISOString(),
        },
      });
    } else if (adminAccount.accountType === "Analytics") {
      return res.status(200).json({
        success: true,
        responseDetails: {
          code: "SUCCESS",
          message: "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo",
          timestamp: new Date().toISOString(),
        },
      });
    }
  }),
);

export default router;
