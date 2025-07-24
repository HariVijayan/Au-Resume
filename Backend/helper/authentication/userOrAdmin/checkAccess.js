import admin from "../../../models/admin/admin.js";
import user from "../../../models/user/user.js";
import addLogs from "../../functions/addLogs.js";

async function checkUserOrAdminAccess(requestedEmail, isAdmin) {
  let requestedAccount;
  if (isAdmin) {
    requestedAccount = await admin.findOne({ email: requestedEmail });
  } else {
    requestedAccount = await user.findOne({ email: requestedEmail });
  }

  if (!requestedAccount) {
    if (isAdmin) {
      await addLogs(
        true,
        true,
        requestedEmail,
        requestedEmail,
        "Confidential",
        "P1",
        `Access attempt without admin account. Potential phising attempt.`
      );
    } else {
      await addLogs(
        false,
        true,
        requestedEmail,
        requestedEmail,
        "Confidential",
        "P1",
        `Access attempt without user account. Potential phising attempt.`
      );
    }
    return { Valid: "NO", HtmlCode: 404, Reason: "User not found." };
  }

  return {
    Valid: "YES",
    HtmlCode: 200,
    UserAccount: requestedAccount,
  };
}

export default checkUserOrAdminAccess;
