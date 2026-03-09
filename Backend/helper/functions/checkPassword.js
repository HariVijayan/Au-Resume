const checkPassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password); // Matches special characters

  if (password.length < minLength) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Password must be at least 8 characters long",
        timestamp: new Date().toISOString(),
      },
    };
  }
  if (!hasUpperCase) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Password must contain at least one uppercase letter",
        timestamp: new Date().toISOString(),
      },
    };
  }
  if (!hasLowerCase) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Password must contain at least one lowercase letter",
        timestamp: new Date().toISOString(),
      },
    };
  }
  if (!hasNumber) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Password must contain at least one number",
        timestamp: new Date().toISOString(),
      },
    };
  }
  if (!hasSpecialChar) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "Password must contain at least one special character",
        timestamp: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "No issues. Strong password",
      timestamp: new Date().toISOString(),
    },
  };
};

export default checkPassword;
