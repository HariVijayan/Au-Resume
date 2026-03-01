import BaseError from "../baseErrorFormat.js";

class NotFoundError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "NOT_FOUND",
      message: "User/Resource not found",
      statusCode: 404,
      overrideMessage,
    });
  }
}

export default NotFoundError;
