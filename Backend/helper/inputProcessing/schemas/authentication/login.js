import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  loginEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  loginPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },

  rememberMe: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "RememberMe value is invalid",
  },

  isAdmin: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "IsAdmin value is invalid",
  },
});

export default inputValidator;
