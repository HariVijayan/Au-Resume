import { checkSchema } from "express-validator";
import { Validators } from "../../../../baseValidators.js";

const inputValidator = checkSchema({
  userEmail: {
    in: ["body"],
    ...Validators.universityEmail,
    errorMessage: "Email value is invalid",
  },
});

export default inputValidator;
