import { logInfo } from "../helper/functions/systemLogger.js";

const apiActivityLogger = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;

  res.send = function (data) {
    const duration = Date.now() - startTime;
    const route = req.originalUrl || req.path;
    const method = req.method;
    const statusCode = res.statusCode;

    const code = `${method}_${statusCode}`;
    const message = `${method} ${route}`;
    const details = `duration: ${duration}ms`;

    logInfo(route, code, message, details);

    return originalSend.call(this, data);
  };

  next();
};

export default apiActivityLogger;
