import { checkSchema } from "express-validator";
import { Validators } from "../../../baseValidators.js";

const inputValidator = checkSchema({
  resumeData: {
    in: ["body"],
    ...Validators.resumeData,
    errorMessage: "Resume Data value is invalid",
  },
  downloadType: {
    in: ["body"],
    ...Validators.resumeDownloadType,
    errorMessage: "Download Type value is invalid",
  },
});

export default inputValidator;
