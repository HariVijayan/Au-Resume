import admin from "../../../models/admin/admin.js";
import user from "../../../models/user/user.js";

async function checkUserOrAdminAccess(requestedEmail, isAdmin) {
  let requestedAccount;
  if (isAdmin) {
    requestedAccount = await admin.findOne({ email: requestedEmail });
  } else {
    requestedAccount = await user.findOne({ email: requestedEmail });
  }

  if (!requestedAccount) {
    return {
      success: false,
      responseDetails: {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "User not found",
        timestamp: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid user or admin",
      timestamp: new Date().toISOString(),
    },
    UserAccount: requestedAccount,
  };
}

export default checkUserOrAdminAccess;
