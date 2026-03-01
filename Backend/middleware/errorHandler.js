const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || "INTERNAL_SERVER_ERROR";
  const message = err.message || "Unexpected server error";

  res.status(statusCode).json({
    success: false,
    errorDetails: {
      code,
      message,
      timestamp: new Date().toISOString(),
    },
  });
};

export default errorHandler;
