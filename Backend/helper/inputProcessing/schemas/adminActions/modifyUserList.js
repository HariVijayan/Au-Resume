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
});

export default inputValidator;
