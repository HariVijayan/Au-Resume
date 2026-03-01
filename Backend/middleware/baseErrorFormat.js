class BaseError extends Error {
  constructor({ code, message, statusCode, overrideMessage }) {
    super(overrideMessage || message);

    this.code = code;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;
