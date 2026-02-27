import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  userEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },
  newPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },
  isAdmin: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "isAdmin value is invalid",
  },
});

export default inputValidator;
