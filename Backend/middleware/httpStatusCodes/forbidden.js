import BaseError from "../baseErrorFormat.js";

class ForbiddenError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "FORBIDDEN",
      message: "Access denied",
      statusCode: 403,
      overrideMessage,
    });
  }
}

export default ForbiddenError;
