import BaseError from "../baseErrorFormat.js";

class UnauthorizedError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "UNAUTHORIZED",
      message: "Authentication required",
      statusCode: 401,
      overrideMessage,
    });
  }
}

export default UnauthorizedError;
