import { checkSchema } from "express-validator";
import { Validators } from "../../../../baseValidators.js";

const inputValidator = checkSchema({
  userEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },
  isAdmin: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "IsAdmin value is invalid",
  },
});

export default inputValidator;
