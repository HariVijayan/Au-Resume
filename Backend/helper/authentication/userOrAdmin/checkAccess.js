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
    return { Valid: "NO", HtmlCode: 404, Reason: "User not found" };
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
    UserAccount: requestedAccount,
  };
}

export default checkUserOrAdminAccess;
