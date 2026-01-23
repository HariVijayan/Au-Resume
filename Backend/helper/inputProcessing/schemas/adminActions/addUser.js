import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const inputValidator = checkSchema({
  additionType: {
    in: ["body"],
    ...Validators.userAdditionType,
    errorMessage: "User addition type value is invalid",
  },

  // Only validated when additionType === "Multiple"
  commonEmailSuffix: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.commonEmailSuffix,
    errorMessage: "Email suffix value is invalid",
  },

  commonRegNoPrefix: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Register Number prefix value is invalid",
  },

  commonRegNoStart: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Register Number start value is invalid",
  },

  commonRegNoEnd: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.registerNumber,
    errorMessage: "Register Number end value is invalid",
  },

  skipRegNo: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.skippableRegNoCsv,
    errorMessage: "Skippable Register Number value is invalid",
  },

  commonUserDept: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.department,
    errorMessage: "Common Department value is invalid",
  },

  commonUserCourseType: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.courseType,
    errorMessage: "Common Course Type value is invalid",
  },

  commonUserProgramme: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.programme,
    errorMessage: "Common Programme value is invalid",
  },

  commonUserBranch: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Multiple",
    ...Validators.branch,
    errorMessage: "Common Branch value is invalid",
  },

  //Only validated when additionType === "Single"
  userEmail: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.email,
    errorMessage: "Email value is invalid",
  },

  userRegNo: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.registerNumber,
    errorMessage: "Register Number value is invalid",
  },

  userDept: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.department,
    errorMessage: "Department value is invalid",
  },

  userCourseType: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.courseType,
    errorMessage: "Course Type value is invalid",
  },

  userProgramme: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.programme,
    errorMessage: "Programme value is invalid",
  },

  userBranch: {
    in: ["body"],
    if: (_, { req }) => req.body.additionType === "Single",
    ...Validators.branch,
    errorMessage: "Branch value is invalid",
  },

  //Always validated
  otpInput: {
    in: ["body"],
    ...Validators.otpInput,
    errorMessage: "Otp value is invalid",
  },
});

export default inputValidator;
