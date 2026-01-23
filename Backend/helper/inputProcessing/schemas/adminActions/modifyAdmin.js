import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
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

  //Only validated when nameChangeNeeded === "true"
  newAdminName: {
    in: ["body"],
    if: (_, { req }) => req.body.nameChangeNeeded === true,
    ...Validators.name,
    errorMessage: "New admin name value is invalid",
  },

  //Only validated when adminTypeChangeNeeded === "true"
  newAdminType: {
    in: ["body"],
    if: (_, { req }) => req.body.adminTypeChangeNeeded === true,
    ...Validators.adminType,
    errorMessage: "New admin type value is invalid",
  },

  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
