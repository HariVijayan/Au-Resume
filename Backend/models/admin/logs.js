import mongoose from "mongoose";
import istDateFormat from "../../helper/dateIstFormat.js";

const logSchema = new mongoose.Schema({
  accountEmail: { type: String, required: true },
  logCreatedByEmail: { type: String, required: true },
  logCategory: { type: String, default: null },
  logDetails: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.LOGS_EXPIRY,
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

logSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  if (!this.expiresAt) {
    this.expiresAt = new Date(
      this.createdAt.getTime() + process.env.LOGS_EXPIRY * 1000
    );
  }

  if (!this.expiresAtFormatted) {
    this.expiresAtFormatted = istDateFormat(this.expiresAt);
  }

  next();
});

export default mongoose.model("adminLog", logSchema);
