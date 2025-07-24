import mongoose from "mongoose";
import istDateFormat from "../../helper/functions/dateIstFormat.js";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerNumber: { type: String, required: true },
  department: { type: String, required: true },
  courseType: { type: String, required: true },
  programme: { type: String, required: true },
  branch: { type: String, required: true },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lockUntilFormatted: { type: String, default: null },
  encryptionSalt: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.USER_ACCOUNT_EXPIRY,
  },
  createdAtFormatted: {
    type: String,
  },
  expiresAt: {
    type: Date,
  },
  expiresAtFormatted: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  if (!this.expiresAt) {
    this.expiresAt = new Date(
      this.createdAt.getTime() + process.env.USER_ACCOUNT_EXPIRY * 1000
    );
  }

  if (!this.expiresAtFormatted) {
    this.expiresAtFormatted = istDateFormat(this.expiresAt);
  }

  next();
});

export default mongoose.model("userList", userSchema);
