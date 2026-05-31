import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import adminUser from "./models/admin/admin.js";

import previousResume from "./routes/requests/pdf/getPreviousResume.js";
import generateResume from "./routes/requests/pdf/generatePdf.js";
import saveResume from "./routes/requests/pdf/saveResume.js";
import firstTimeOtp from "./routes/authentication/otp/firstTimeOtp/passwordReset.js";
import resendOtpNewUser from "./routes/authentication/otp/resendOtp/newUserRegistration.js";
import resendOtp from "./routes/authentication/otp/resendOtp/passwordReset.js";
import verifyOtpNewUser from "./routes/authentication/otp/verifyOtp/newUserRegistration.js";
import verifyOtp from "./routes/authentication/otp/verifyOtp/passwordReset.js";
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
import getUserDetails from "./routes/requests/userActions/getUserDetails.js";
import userApprovalOtp from "./routes/requests/userActions/approvalOtp.js";
import userProfilePasswordReset from "./routes/requests/userActions/resetPasswordWithRecords.js";
import encryptionKeyReset from "./routes/requests/userActions/resetEncryptionKey.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import errorHandler from "./middleware/errorHandler.js";
import { scheduleLogRotation } from "./helper/functions/logRotationScheduler.js";
import { getRedisClient, closeRedisClient } from "./middleware/redis.js";
import {
  startQueueProcessor,
  stopQueueProcessor,
} from "./middleware/userLogHandler.js";

const app = express();
const port = 5000;

const BCRYPT_COST_FACTOR = 12;

// Trust proxy MUST be set before cors if Express is behind a reverse proxy
// This allows req.ip to correctly reflect the real client IP from X-Forwarded-For
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
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

app.use("/userDetails", getUserDetails);

app.use("/user/approvals", userApprovalOtp);

app.use("/user/passwordAction", userProfilePasswordReset);

app.use("/user/encryptionKey", encryptionKeyReset);

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

app.use(errorHandler);

// Do NOT listen here. Startup sequence happens in start() function below.
// Listening before Redis/Mongo init would cause requests to fail.

const start = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch((err) => console.error("MongoDB connection error:", err));

  await getRedisClient();
  startQueueProcessor();

  const PORT = process.env.PORT ?? 5000;
  const server = app.listen(PORT, () => {
    console.log(`[Server] Listening on :${PORT}`);
    scheduleLogRotation();
  });

  // ── Graceful shutdown ──────────────────────────────────────────────────────
  // Shutdown order matters:
  //   1. Stop accepting new requests  (server.close)
  //   2. Flush the Redis log queue    (stopQueueProcessor)
  //   3. Disconnect Mongo             (mongoose.disconnect)
  //   4. Close Redis                  (closeRedisClient)
  const shutdown = async (signal) => {
    console.log(`[Server] ${signal} received. Shutting down...`);
    server.close(async () => {
      await stopQueueProcessor();
      await mongoose.disconnect();
      await closeRedisClient();
      console.log("[Server] Clean exit.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

start().catch((err) => {
  console.error("[Startup] Fatal:", err);
  process.exit(1);
});

await adminUser.deleteMany();

console.log("Admin users database collection initialized.");

const adminEmail = process.env.SUPERADMIN_EMAIL;
const adminPassword = process.env.SUPERADMIN_PASSWORD;

const salt = await bcrypt.genSalt(BCRYPT_COST_FACTOR);
const hashedPassword = await bcrypt.hash(adminPassword, salt);

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

console.log("New SuperAdmin added. Good to go!");
