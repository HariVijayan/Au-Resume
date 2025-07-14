import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import previousResume from "./routes/requests/pdf/getPreviousResume.js";
import generateResume from "./routes/requests/pdf/generatePdf.js";
import saveResume from "./routes/requests/pdf/saveResume.js";
import firstTimeOtp from "./routes/authentication/otp/firstTimeOtp/passwordResetOtp.js";
import resendOtpNewUser from "./routes/authentication/otp/resendOtp/newRegistration.js";
import resendOtp from "./routes/authentication/otp/resendOtp/resendOtp.js";
import verifyOtpNewUser from "./routes/authentication/otp/verifyOtp/newRegistration.js";
import verifyOtp from "./routes/authentication/otp/verifyOtp/verifyOtp.js";
import login from "./routes/authentication/login.js";
import logout from "./routes/authentication/logout.js";
import checkUnProtectedAccess from "./routes/requests/checkAccess/checkUnProtectedAccess.js";
import checkProtectedAccess from "./routes/requests/checkAccess/checkProtectedAccess.js";
import checkAdminAccess from "./routes/requests/checkAccess/checkAdminAccess.js";
import registerNewUser from "./routes/requests/newUser/registerNewUser.js";
import passwordReset from "./routes/requests/passwordReset/passwordReset.js";
import adminUser from "./models/admin/admin.js";
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
  email: "hbds@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "SuperAdmin",
});
await newUser2.save();

console.log("New SuperAdmin added. Good to go!");
