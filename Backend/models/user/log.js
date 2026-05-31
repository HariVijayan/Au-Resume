import mongoose from "mongoose";
import { istDateFormat } from "../../helper/functions/dateIstFormat.js"; // adjust path if needed

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => EMAIL_RE.test(v),
      message: "Invalid email format.",
    },
  },
  route: { type: String, required: true, trim: true },
  statusCode: { type: Number, required: true, min: 100, max: 599 },
  ip: { type: String, trim: true, default: null },
  userAgent: { type: String, trim: true, default: null },
  duration: { type: Number, min: 0, default: null }, // ms
  timestamp: { type: Date, required: true, default: Date.now },
  timestampFormatted: { type: String },
  log: { type: String, required: true, trim: true },
});

userLogSchema.pre("save", function (next) {
  if (!this.timestampFormatted) {
    this.timestampFormatted = istDateFormat(this.timestamp);
  }
  next();
});

// User fetches always filter by email + timestamp range.
// Email leads the compound index since it's the primary equality predicate.
// Unlike adminLog, email is always part of the query — compound index is correct here.
userLogSchema.index({ email: 1, timestamp: -1 });

// TTL index — auto-deletes logs older than 90 days.
// Ascending direction required by MongoDB. Separate from the query index above.
userLogSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 365 * 5 },
);

const UserLog = mongoose.model("UserLog", userLogSchema);

export default UserLog;
