import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const multiUserRemoval = {
  commonEmailSuffix: {
    in: ["body"],
    ...Validators.commonEmailSuffix,
    errorMessage: "Common email suffix value is invalid",
  },
  commonRegNoPrefix: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Common register number prefix value is invalid",
  },
  commonRegNoStart: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Common register number start value is invalid",
  },
  commonRegNoEnd: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Common register number end value is invalid",
  },
  skipRegNo: {
    in: ["body"],
    ...Validators.skippableRegNoCsv,
    errorMessage: "Skippable register number value is invalid",
  },
};

const singleUserRemoval = {
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
};

const inputValidator = [
  checkSchema({
    removalType: {
      in: ["body"],
      ...Validators.userRemovalType,
      errorMessage: "Removal type value is invalid",
    },
  }),
  (req, res, next) => {
    const removalType = req.body.removalType;
    let schema;
    if (removalType === "Multiple") {
      schema = checkSchema(multiUserRemoval);
    } else if (removalType === "Single") {
      schema = checkSchema(singleUserRemoval);
    }

    if (!schema) return next();

    let index = 0;
    const executeNext = () => {
      if (index < schema.length) {
        schema[index++](req, res, executeNext);
      } else {
        next();
      }
    };
    executeNext();
  },
];

export default inputValidator;
