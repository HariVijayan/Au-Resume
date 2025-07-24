import adminLogs from "../../models/logs/admin.js";
import userLogs from "../../models/logs/user.js";
import adminError from "../../models/logs/adminError.js";
import userError from "../../models/logs/userError.js";

async function addLogs(
  isAdmin,
  isError,
  logEmail,
  addedBy,
  category,
  priority,
  log
) {
  try {
    if (isAdmin) {
      if (isError) {
        await adminError.create({
          logLinkedAccount: logEmail,
          logAddedBy: addedBy,
          logCategory: category,
          logPriority: priority,
          logDetails: log,
        });
      }
      await adminLogs.create({
        logLinkedAccount: logEmail,
        logAddedBy: addedBy,
        logCategory: category,
        logPriority: priority,
        logDetails: log,
      });
    } else {
      if (isError) {
        await userError.create({
          logLinkedAccount: logEmail,
          logAddedBy: addedBy,
          logCategory: category,
          logPriority: priority,
          logDetails: log,
        });
      }
      await userLogs.create({
        logLinkedAccount: logEmail,
        logAddedBy: addedBy,
        logCategory: category,
        logPriority: priority,
        logDetails: log,
      });
    }
    return {
      Valid: "YES",
      HtmlCode: 200,
    };
  } catch (error) {
    return {
      Valid: "NO",
      HtmlCode: 500,
      Reason: "Server error",
    };
  }
}

export default addLogs;
