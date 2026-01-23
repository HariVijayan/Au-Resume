import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  adminEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  adminType: {
    in: ["body"],
    ...Validators.adminType,
    errorMessage: "Admin type value is invalid",
  },

  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
