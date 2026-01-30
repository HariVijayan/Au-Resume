import { checkSchema } from "express-validator";
import { Validators } from "../../baseValidators.js";

const multipleUserAddition = {
  commonEmailSuffix: {
    in: ["body"],
    ...Validators.commonEmailSuffix,
    errorMessage: "Email suffix value is invalid",
  },
  commonRegNoPrefix: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Register Number prefix value is invalid",
  },
  commonRegNoStart: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Register Number start value is invalid",
  },
  commonRegNoEnd: {
    in: ["body"],
    ...Validators.registerNumber,
    errorMessage: "Register Number end value is invalid",
  },
  skipRegNo: {
    in: ["body"],
    ...Validators.skippableRegNoCsv,
    errorMessage: "Skippable Register Number value is invalid",
  },
  commonUserDept: {
    in: ["body"],
    ...Validators.department,
    errorMessage: "Common Department value is invalid",
  },
  commonUserCourseType: {
    in: ["body"],
    ...Validators.courseType,
    errorMessage: "Common Course Type value is invalid",
  },
  commonUserProgramme: {
    in: ["body"],
    ...Validators.programme,
    errorMessage: "Common Programme value is invalid",
  },
  commonUserBranch: {
    in: ["body"],
    ...Validators.branch,
    errorMessage: "Common Branch value is invalid",
  },
};

const singleUserAddition = {
  userEmail: {
    in: ["body"],
    ...Validators.email,
    errorMessage: "Email value is invalid",
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
};

const inputValidator = [
  checkSchema({
    additionType: {
      in: ["body"],
      ...Validators.userAdditionType,
      errorMessage: "User addition type value is invalid",
    },
    otpInput: {
      in: ["body"],
      ...Validators.otpInput,
      errorMessage: "Otp value is invalid",
    },
  }),
  (req, res, next) => {
    const additionType = req.body.additionType;
    let schema;
    if (additionType === "Multiple") {
      schema = checkSchema(multipleUserAddition);
    } else if (additionType === "Single") {
      schema = checkSchema(singleUserAddition);
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
