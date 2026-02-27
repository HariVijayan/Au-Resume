import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  requestType: {
    in: ["body"],
    ...Validators.userProfileRequestType,
    errorMessage: "Request type value is invalid",
  },
  newPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },
});

export default inputValidator;
