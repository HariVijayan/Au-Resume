import pendingUser from "../../../models/user/pendingUser.js";

async function checkPendingUserAccess(requestedEmail) {
  const requestedAccount = await pendingUser.findOne({ email: requestedEmail });
  if (!requestedAccount) {
    return {
      Valid: "NO",
      HtmlCode: 400,
      Reason: "User not found or already verified",
    };
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
    PendingUser: requestedAccount,
  };
}

export default checkPendingUserAccess;
