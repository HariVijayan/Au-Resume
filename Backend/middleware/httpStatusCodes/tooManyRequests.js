import BaseError from "../baseErrorFormat.js";

class TooManyRequestsError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests",
      statusCode: 429,
      overrideMessage,
    });
  }
}

export default TooManyRequestsError;
