import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  resumeData: {
    in: ["body"],
    ...Validators.resumeData,
    errorMessage: "Resume Data value is invalid",
  },
  userPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },
});

export default inputValidator;
