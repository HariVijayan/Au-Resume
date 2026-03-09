import pendingUser from "../../../models/user/pendingUser.js";

async function checkPendingUserAccess(requestedEmail) {
  const requestedAccount = await pendingUser.findOne({ email: requestedEmail });
  if (!requestedAccount) {
    return {
      success: false,
      responseDetails: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "User not found or already verified",
        timestamp: new Date().toISOString(),
      },
    };
  }

  return {
    success: true,
    responseDetails: {
      statusCode: 200,
      code: "SUCCESS",
      message: "Valid pending user",
      timestamp: new Date().toISOString(),
    },
    PendingUser: requestedAccount,
  };
}

export default checkPendingUserAccess;
