import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  removalType: {
    in: ["body"],
    ...Validators.userRemovalType,
    errorMessage: "Removal type value is invalid",
  },

  //Only validated when userRemovalType === "Multiple"
  commonEmailSuffix: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Multiple",
    ...Validators.commonEmailSuffix,
    errorMessage: "Common email suffix value is invalid",
  },

  commonRegNoPrefix: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Common register number prefix value is invalid",
  },

  commonRegNoStart: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Common register number start value is invalid",
  },

  commonRegNoEnd: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Common register number end value is invalid",
  },

  skipRegNo: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Multiple",
    ...Validators.skippableRegNoCsv,
    errorMessage: "Skippable register number value is invalid",
  },

  //Only validated when userRemovalType === "Single"
  userEmail: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Single",
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  userRegNo: {
    in: ["body"],
    if: (_, { req }) => req.body.userRemovalType === "Single",
    ...Validators.registerNumber,
    errorMessage: "Register number value is invalid",
  },

  //Always validated
  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
