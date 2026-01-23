import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  userType: {
    in: ["body"],
    ...Validators.logoutType,
    errorMessage: "Logout Type value is invalid",
  },
});

export default inputValidator;
