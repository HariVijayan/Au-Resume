import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  adminName: {
    in: ["body"],
    ...Validators.name,
    errorMessage: "Name value is invalid",
  },

  adminEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  adminType: {
    in: ["body"],
    ...Validators.adminType,
    errorMessage: "Admin Type value is invalid",
  },

  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
