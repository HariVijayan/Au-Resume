import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  userEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  userRegNo: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Register number value is invalid",
  },

  passwordResetNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Password reset needed value is invalid",
  },

  accountUnlockNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Account unlock needed value is invalid",
  },

  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
