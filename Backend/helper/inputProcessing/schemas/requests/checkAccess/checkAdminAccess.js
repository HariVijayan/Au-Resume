import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  routeType: {
    in: ["body"],
    ...Validators.adminType,
    errorMessage: "Admin type value is invalid",
  },
});

export default inputValidator;
