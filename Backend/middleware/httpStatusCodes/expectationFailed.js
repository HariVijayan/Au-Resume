import BaseError from "../baseErrorFormat.js";

class ExpectationFailedError extends BaseError {
  constructor(overrideMessage) {
    super({
      code: "EXPECTATION_FAILED",
      message: "Failed to achieve expected behavior",
      statusCode: 417,
      overrideMessage,
    });
  }
}

export default ExpectationFailedError;
