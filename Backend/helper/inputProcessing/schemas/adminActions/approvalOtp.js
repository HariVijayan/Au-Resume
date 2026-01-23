import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  requestType: {
    in: ["body"],
    ...Validators.adminPanelRequestType,
    errorMessage: "Request type value is invalid",
  },
});

export default inputValidator;
