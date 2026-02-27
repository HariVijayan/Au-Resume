import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  userPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },
});

export default inputValidator;
