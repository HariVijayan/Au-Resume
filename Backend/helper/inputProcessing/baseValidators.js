import {
  EmailDomains,
  AdminTypes,
  UserAdditionType,
  UserRemovalType,
  LogoutUserType,
  ResumeDownloadType,
  AdminPanelOtpRequestReasons,
  UserProfileOtpRequestReasons,
  Departments,
  CourseTypes,
  Programmes,
  Branches,
} from "./preDefinedValues.js";

export const Validators = {
  booleanValue: {
    exists: {
      errorMessage: "Boolean value is required",
    },

    notEmpty: {
      errorMessage: "Boolean value cannot be empty",
    },

    isBoolean: {
      errorMessage: "Not a boolean value",
    },
  },

  email: {
    exists: {
      errorMessage: "Email is required",
    },

    notEmpty: {
      errorMessage: "Email cannot be empty",
    },

    isEmail: {
      errorMessage: "Invalid email format",
    },

    trim: true,

    normalizeEmail: true,
  },

  universityEmail: {
    exists: {
      errorMessage: "Email is required",
    },

    notEmpty: {
      errorMessage: "Email cannot be empty",
    },

    isEmail: {
      errorMessage: "Invalid email format",
    },

    trim: true,

    normalizeEmail: true,

    custom: {
      options: (value) => {
        const domain = "@" + value.split("@")[1];
        if (!EmailDomains.includes(domain)) {
          throw new Error("Only university emails are allowed");
        }
        return true;
      },
    },
  },

  password: {
    exists: {
      errorMessage: "Password is required",
    },

    notEmpty: {
      errorMessage: "Password cannot be empty",
    },

    isString: {
      errorMessage: "Password must be a string",
    },

    isLength: {
      options: { min: 8, max: 25 },
      errorMessage: "Password must be between 8 and 25 characters",
    },
  },

  otpInput: {
    exists: {
      errorMessage: "Otp is required",
    },

    notEmpty: {
      errorMessage: "Otp cannot be empty",
    },

    isString: {
      errorMessage: "Otp must be a string",
    },

    isLength: {
      options: { min: 6, max: 8 },
      errorMessage: "Otp must be between 6 and 8 characters",
    },
  },

  name: {
    exists: {
      errorMessage: "Name is required",
    },

    notEmpty: {
      errorMessage: "Name cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Name must be a string",
    },

    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: "Name must be between 1 and 50 characters",
    },
  },

  adminType: {
    exists: {
      errorMessage: "Admin type is required",
    },

    notEmpty: {
      errorMessage: "Admin type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Admin type must be a string",
    },

    isIn: {
      options: [AdminTypes],
      errorMessage: "Invalid admin type",
    },
  },

  userAdditionType: {
    exists: {
      errorMessage: "User addition type is required",
    },

    notEmpty: {
      errorMessage: "User addition type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "User addition type must be a string",
    },

    isIn: {
      options: [UserAdditionType],
      errorMessage: "Invalid User addition type",
    },
  },

  userRemovalType: {
    exists: {
      errorMessage: "User removal type is required",
    },

    notEmpty: {
      errorMessage: "User removal type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "User removal type must be a string",
    },

    isIn: {
      options: [UserRemovalType],
      errorMessage: "Invalid User removal type",
    },
  },

  commonEmailSuffix: {
    exists: {
      errorMessage: "Common Email Suffix is required",
    },

    notEmpty: {
      errorMessage: "Common Email Suffix cannot be empty",
    },

    trim: true,

    isString: {
      errorMessage: "Common Email Suffix must be a string",
    },

    isIn: {
      options: [EmailDomains],
      errorMessage: "Invalid Common Email Suffix",
    },
  },

  registerNumber: {
    exists: {
      errorMessage: "Register Number is required",
    },

    notEmpty: {
      errorMessage: "Register Number cannot be empty",
    },

    trim: true,

    isInt: {
      errorMessage: "Register Number must be a number",
    },
  },

  skippableRegNoCsv: {
    exists: {
      errorMessage: "Skippable Register Number is required",
    },

    notEmpty: {
      errorMessage: "Skippable Register Number cannot be empty",
    },

    escape: true,

    trim: true,

    matches: {
      options: [/^(?!\s)[0-9,]*(\s[0-9,]+)*(?<!\s)$/],
      errorMessage:
        "Skippable Register Number must have digits, commas and whitespaces only",
    },
  },

  department: {
    exists: {
      errorMessage: "Department is required",
    },

    notEmpty: {
      errorMessage: "Department cannot be empty",
    },

    trim: true,

    isString: {
      errorMessage: "Department must be a string",
    },

    isIn: {
      options: [Departments],
      errorMessage: "Invalid department",
    },
  },

  courseType: {
    exists: {
      errorMessage: "Course Type is required",
    },

    notEmpty: {
      errorMessage: "Course Type cannot be empty",
    },

    trim: true,

    isString: {
      errorMessage: "Course Type must be a string",
    },

    isIn: {
      options: [CourseTypes],
      errorMessage: "Invalid Course Type",
    },
  },

  programme: {
    exists: {
      errorMessage: "Programme is required",
    },

    notEmpty: {
      errorMessage: "Programme cannot be empty",
    },

    trim: true,

    isString: {
      errorMessage: "Programme must be a string",
    },

    isIn: {
      options: [Programmes],
      errorMessage: "Invalid Programme",
    },
  },

  branch: {
    exists: {
      errorMessage: "Branch is required",
    },

    notEmpty: {
      errorMessage: "Branch cannot be empty",
    },

    trim: true,

    isString: {
      errorMessage: "Branch must be a string",
    },

    isIn: {
      options: [Branches],
      errorMessage: "Invalid Branch",
    },
  },

  adminPanelRequestType: {
    exists: {
      errorMessage: "Request Type is required",
    },

    notEmpty: {
      errorMessage: "Request Type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Request Type must be a string",
    },

    isIn: {
      options: [AdminPanelOtpRequestReasons],
      errorMessage: "Invalid Request Type",
    },
  },

  userProfileRequestType: {
    exists: {
      errorMessage: "Request Type is required",
    },

    notEmpty: {
      errorMessage: "Request Type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Request Type must be a string",
    },

    isIn: {
      options: [UserProfileOtpRequestReasons],
      errorMessage: "Invalid Request Type",
    },
  },

  logoutType: {
    exists: {
      errorMessage: "Logout Type is required",
    },

    notEmpty: {
      errorMessage: "Logout Type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Logout Type must be a string",
    },

    isIn: {
      options: [LogoutUserType],
      errorMessage: "Invalid Logout Type",
    },
  },

  resumeDownloadType: {
    exists: {
      errorMessage: "Download Type is required",
    },

    notEmpty: {
      errorMessage: "Download Type cannot be empty",
    },

    trim: true,

    escape: true,

    isString: {
      errorMessage: "Download Type must be a string",
    },

    isIn: {
      options: [ResumeDownloadType],
      errorMessage: "Invalid Download Type",
    },
  },
};
