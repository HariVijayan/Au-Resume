import BaseError from "../baseErrorFormat.js";

class BadRequestError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "BAD_REQUEST",
      message: "Invalid request",
      statusCode: 400,
      overrideMessage,
    });
  }
}

export default BadRequestError;
