import { logError } from "../helper/functions/systemLogger.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Unexpected server error";

  if (statusCode >= 500) {
    const route = req.originalUrl || req.path;
    const additionalInfo =
      statusCode >= 500
        ? `method: ${req.method}, stack: ${err.stack?.split("\n")[1]?.trim() || "N/A"}`
        : `method: ${req.method}`;
    logError(route, code, message, additionalInfo);
  }

  res.status(statusCode).json({
    success: false,
    responseDetails: {
      code,
      message,
      timestamp: new Date().toISOString(),
    },
    otherData: {},
  });
};

export default errorHandler;
