import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import previousResume from "./Pdf/Routing_Endpoint/getPreviousResume.js";
import generateResume from "./Pdf/Routing_Endpoint/generatePdf.js";
import previewResume from "./Pdf/Routing_Endpoint/previewPdf.js";
import firstTimeOtp from "./Login/Routing_Endpoints/Otp/First_Time_Otp/passwordResetOtp.js";
import resendOtpNewUser from "./Login/Routing_Endpoints/Otp/Resend_Otp/newRegistration.js";
import resendOtp from "./Login/Routing_Endpoints/Otp/Resend_Otp/resendOtp.js";
import verifyOtpNewUser from "./Login/Routing_Endpoints/Otp/Verify_Otp/newRegistration.js";
import verifyOtp from "./Login/Routing_Endpoints/Otp/Verify_Otp/verifyOtp.js";
import login from "./Login/Routing_Endpoints/Authentication/Login/login.js";
import logout from "./Login/Routing_Endpoints/Authentication/Logout/logout.js";
import checkAccess from "./Login/Routing_Endpoints/Requests/Check_Access/checkAccess.js";
import checkAdminAccess from "./Login/Routing_Endpoints/Requests/Check_Access/checkAdminAccess.js";
import registerNewUser from "./Login/Routing_Endpoints/Requests/New_User/registerNewUser.js";
import passwordReset from "./Login/Routing_Endpoints/Requests/Password_Reset/passwordReset.js";
import adminUser from "./Login/Database_Models/adminUser.js";
import fetchAdmins from "./Admin_Actions/Super_Admin/Routing_Endpoints/fetchAdmins.js";
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

app.use("/preview", previewResume);

app.use("/getFirstOtp", firstTimeOtp);

app.use("/resendOtp/newUser", resendOtpNewUser);

app.use("/resendOtp/existingUser", resendOtp);

app.use("/verifyOtp/newUser", verifyOtpNewUser);

app.use("/verifyOtp/existingUser", verifyOtp);

app.use("/authenticateUser", login);

app.use("/authenticateUser", logout);

app.use("/createUser", registerNewUser);

app.use("/userRequest", passwordReset);

app.use("/verifySession", checkAccess);

app.use("/verifyAdminSession", checkAdminAccess);

app.use("/superAdmin/fetchAdmin", fetchAdmins);

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

const newUser3 = new adminUser({
  name: "Hari2",
  email: "hari2jv0310@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "SuperAdmin",
});
await newUser3.save();

const newUser1 = new adminUser({
  name: "Meow",
  email: "meow@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "Admin",
});
await newUser1.save();

const newUser4 = new adminUser({
  name: "Meow2",
  email: "meow2@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "Admin",
});
await newUser4.save();

const newUser2 = new adminUser({
  name: "Bow",
  email: "bow@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "Analytics",
});
await newUser2.save();

const newUser5 = new adminUser({
  name: "Bow2",
  email: "bow2@gmail.com",
  password: hashedPassword,
  createdAt: createdAt,
  createdAtFormatted: createdAtFormatted,
  createdBy: "System",
  accountType: "Analytics",
});
await newUser5.save();

console.log("New SuperAdmin added. Good to go!");
