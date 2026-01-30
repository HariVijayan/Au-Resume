import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const baseSchema = {
  adminEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },
  currentAdminType: {
    in: ["body"],
    ...Validators.adminType,
    errorMessage: "Current admin type value is invalid",
  },
  nameChangeNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Name change needed value is invalid",
  },
  adminTypeChangeNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Admin type change needed value is invalid",
  },
  passwordResetNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Password reset needed value is invalid",
  },
  accountUnlockNeeded: {
    in: ["body"],
    ...Validators.booleanValue,
    errorMessage: "Account unlock needed value is invalid",
  },
  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
};

const nameChangeSchema = {
  newAdminName: {
    in: ["body"],
    ...Validators.name,
    errorMessage: "New admin name value is invalid",
  },
};

const adminTypeChangeSchema = {
  newAdminType: {
    in: ["body"],
    ...Validators.adminType,
    errorMessage: "New admin type value is invalid",
  },
};

const inputValidator = [
  checkSchema(baseSchema),
  (req, res, next) => {
    const { nameChangeNeeded, adminTypeChangeNeeded } = req.body;
    let schema;

    if (nameChangeNeeded === true) {
      schema = checkSchema(nameChangeSchema);
    } else if (adminTypeChangeNeeded === true) {
      schema = checkSchema(adminTypeChangeSchema);
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
