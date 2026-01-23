import { checkSchema } from "express-validator";
import { Validators } from "../../../../baseValidators.js";

const inputValidator = checkSchema({
  userEmail: {
    in: ["body"],
    ...Validators.universityEmail,
    errorMessage: "Email value is invalid",
  },
  userPassword: {
    in: ["body"],
    ...Validators.password,
    errorMessage: "Password value is invalid",
  },
  userRegNo: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Register Number value is invalid",
  },
  userDept: {
    in: ["body"],
    ...Validators.department,
    errorMessage: "Department value is invalid",
  },
  userCourseType: {
    in: ["body"],
    ...Validators.courseType,
    errorMessage: "Course Type value is invalid",
  },
  userProgramme: {
    in: ["body"],
    ...Validators.programme,
    errorMessage: "Programme value is invalid",
  },
  userBranch: {
    in: ["body"],
    ...Validators.branch,
    errorMessage: "Branch value is invalid",
  },
});

export default inputValidator;
