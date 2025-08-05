import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminUser from "./models/admin/admin.js";
import adminLogs from "./models/logs/admin.js";
import adminErrorLogs from "./models/logs/adminError.js";
import userLogs from "./models/logs/user.js";
import userErrorLogs from "./models/logs/userError.js";

import previousResume from "./routes/requests/pdf/getPreviousResume.js";
import generateResume from "./routes/requests/pdf/generatePdf.js";
import saveResume from "./routes/requests/pdf/saveResume.js";
import firstTimeOtp from "./routes/authentication/otp/firstTimeOtp/passwordReset.js";
import resendOtpNewUser from "./routes/authentication/otp/resendOtp/newUserRegistration.js";
import resendOtp from "./routes/authentication/otp/resendOtp/passwordReset.js";
import verifyOtpNewUser from "./routes/authentication/otp/verifyOtp/newRegistration.js";
import verifyOtp from "./routes/authentication/otp/verifyOtp/verifyOtp.js";
import login from "./routes/authentication/login.js";
import logout from "./routes/authentication/logout.js";
import checkUnProtectedAccess from "./routes/requests/checkAccess/checkUnProtectedAccess.js";
import checkProtectedAccess from "./routes/requests/checkAccess/checkProtectedAccess.js";
import checkAdminAccess from "./routes/requests/checkAccess/checkAdminAccess.js";
import registerNewUser from "./routes/authentication/otp/firstTimeOtp/newUserRegistration.js";
import passwordReset from "./routes/requests/userActions/passwordReset.js";
import fetchAdmins from "./routes/adminActions/fetchAdmins.js";
import approvalOtp from "./routes/adminActions/approvalOtp.js";
import addAdmin from "./routes/adminActions/addAdmin.js";
import removeAdmin from "./routes/adminActions/removeAdmin.js";
import modifyAdmin from "./routes/adminActions/modifyAdmin.js";
import addUserList from "./routes/adminActions/addUserList.js";
import removeUserList from "./routes/adminActions/removeUserList.js";
import modifyUserList from "./routes/adminActions/modifyUserList.js";
import addUser from "./routes/adminActions/addUser.js";
import removeUser from "./routes/adminActions/removeUser.js";
import modifyUser from "./routes/adminActions/modifyUser.js";
import fetchLog from "./routes/adminActions/fetchLog.js";
import getLogDetails from "./routes/adminActions/getLogDetails.js";
import deleteLogs from "./routes/adminActions/deleteLogs.js";
import downloadLogs from "./routes/adminActions/downloadLogs.js";
import getUserDetails from "./routes/requests/userActions/getUserDetails.js";
import userApprovalOtp from "./routes/requests/userActions/approvalOtp.js";
import userProfilePasswordReset from "./routes/requests/userActions/resetPasswordWithRecords.js";
import encryptionKeyReset from "./routes/requests/userActions/resetEncryptionKey.js";
import fetchUserLogs from "./routes/requests/userActions/fetchLog.js";
import mongoose from "mongoose";
import crypto from "crypto";

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

//Routing
app.use("/getPrevious", previousResume);

app.use("/generate", generateResume);

app.use("/saveResume", saveResume);

app.use("/getFirstOtp", firstTimeOtp);

app.use("/resendOtp/newUser", resendOtpNewUser);

app.use("/resendOtp/existingUser", resendOtp);

app.use("/verifyOtp/newUser", verifyOtpNewUser);

app.use("/verifyOtp/existingUser", verifyOtp);

app.use("/authenticateUser", login);

app.use("/authenticateUser", logout);

app.use("/createUser", registerNewUser);

app.use("/userRequest", passwordReset);

app.use("/verifySession/authenticationRoutes", checkUnProtectedAccess);

app.use("/verifySession/protectedRoutes", checkProtectedAccess);

app.use("/verifyAdminSession", checkAdminAccess);

app.use("/superAdmin/fetchAdmin", fetchAdmins);

app.use("/admin/approvals", approvalOtp);

app.use("/superAdmin/actions/addNewAdmin", addAdmin);

app.use("/superAdmin/actions/existingAdmin", removeAdmin);

app.use("/superAdmin/actions/modifyAdmin", modifyAdmin);

app.use("/admin/userMgmt/addUser", addUserList);

app.use("/admin/userMgmt/removeUser", removeUserList);

app.use("/admin/userMgmt/modifyUser", modifyUserList);

app.use("/admin/actions/userMgmt/newUser", addUser);

app.use("/admin/actions/userMgmt/existingUser", removeUser);

app.use("/admin/actions/userMgmt/modifyAccount", modifyUser);

app.use("/admin/actions/logMgmt", fetchLog);

app.use("/admin/actions/logMgmt/logDetails", getLogDetails);

app.use("/admin/actions/logMgmt/deleteRequest", deleteLogs);

app.use("/admin/actions/logMgmt/downloadRequest", downloadLogs);

app.use("/userDetails", getUserDetails);

app.use("/user/approvals", userApprovalOtp);

app.use("/user/passwordAction", userProfilePasswordReset);

app.use("/user/encryptionKey", encryptionKeyReset);

app.use("/user/logAction", fetchUserLogs);

const formatISTTimestamp = (date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  })
    .format(date)
    .replace(",", "");
};

app.listen(port, () => {
  console.log(`Server started running at port number ${port} successfully.`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

await adminUser.deleteMany();
await adminLogs.deleteMany();
await adminErrorLogs.deleteMany();
await userLogs.deleteMany();
await userErrorLogs.deleteMany();

console.log("Admin users database collection initialized.");

const adminEmail = process.env.SUPERADMIN_EMAIL;
const adminPassword = process.env.SUPERADMIN_PASSWORD;

const hashedPassword = crypto
  .createHash("sha256")
  .update(adminPassword)
  .digest("hex");

const createdAt = new Date(Date.now());
const createdAtFormatted = formatISTTimestamp(createdAt);

const newUser = new adminUser({
  name: "Hari",
  email: adminEmail,
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "SuperAdmin",
});
await newUser.save();

const newUser2 = new adminUser({
  name: "Hari",
  email: "hsasa@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "Admin",
});
await newUser2.save();

for (let i = 1; i <= 25; i++) {
  const newAdminLog = new adminLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P4",
    logDetails: `Admin log number: ${i}`,
  });
  await newAdminLog.save();

  const newAdminErrorLog = new adminErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P4",
    logDetails: `Admin error log number: ${i}`,
  });
  await newAdminErrorLog.save();

  const userLog = new userLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P4",
    logDetails: `User log number: ${i}`,
  });
  await userLog.save();

  const userErrorLog = new userErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P4",
    logDetails: `User error log number: ${i}`,
  });
  await userErrorLog.save();
}

for (let i = 26; i <= 50; i++) {
  const newAdminLog = new adminLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P3",
    logDetails: `Admin log number: ${i}`,
  });
  await newAdminLog.save();

  const newAdminErrorLog = new adminErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P3",
    logDetails: `Admin error log number: ${i}`,
  });
  await newAdminErrorLog.save();

  const userLog = new userLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P3",
    logDetails: `User log number: ${i}`,
  });
  await userLog.save();

  const userErrorLog = new userErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P3",
    logDetails: `User error log number: ${i}`,
  });
  await userErrorLog.save();
}

for (let i = 51; i <= 75; i++) {
  const newAdminLog = new adminLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P2",
    logDetails: `Admin log number: ${i}`,
  });
  await newAdminLog.save();

  const newAdminErrorLog = new adminErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P2",
    logDetails: `Admin error log number: ${i}`,
  });
  await newAdminErrorLog.save();

  const userLog = new userLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P2",
    logDetails: `User log number: ${i}`,
  });
  await userLog.save();

  const userErrorLog = new userErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P2",
    logDetails: `User error log number: ${i}`,
  });
  await userErrorLog.save();
}

for (let i = 76; i <= 105; i++) {
  const newAdminLog = new adminLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P1",
    logDetails: `Admin log number: ${i}`,
  });
  await newAdminLog.save();

  const newAdminErrorLog = new adminErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P1",
    logDetails: `Admin error log number: ${i}`,
  });
  await newAdminErrorLog.save();

  const userLog = new userLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P1",
    logDetails: `User log number: ${i}`,
  });
  await userLog.save();

  const userErrorLog = new userErrorLogs({
    logLinkedAccount: "System",
    logAddedBy: "System",
    logCategory: "Public",
    logPriority: "P1",
    logDetails: `User error log number: ${i}`,
  });
  await userErrorLog.save();
}

console.log("New SuperAdmin added. Good to go!");
