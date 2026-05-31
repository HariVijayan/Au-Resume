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
    const details = `duration: ${duration}ms`;

    logInfo(route, code, details);

    return originalSend.call(this, data);
  };

  next();
};

export default apiActivityLogger; //Add app.use(apiActivityLogger) in server.js for automatic addition of Info logs
