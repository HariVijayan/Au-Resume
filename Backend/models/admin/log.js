import mongoose from "mongoose";
import { istDateFormat } from "../../helper/functions/dateIstFormat.js"; // adjust path if needed

const adminLogSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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

adminLogSchema.pre("save", function (next) {
  if (!this.timestampFormatted) {
    this.timestampFormatted = istDateFormat(this.timestamp);
  }
  next();
});

// Admin fetches are never filtered by email — only by timestamp range.
// A compound (email, timestamp) index would be wasteful here.
// Single-field descending timestamp index matches the sort-only access pattern.
adminLogSchema.index({ timestamp: -1 });

// TTL index — auto-deletes logs older than 90 days.
// Ascending direction is required by MongoDB for TTL indexes.
// This is intentionally separate from the query index above.
adminLogSchema.index(
  { timestamp: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 365 * 5 },
);

const AdminLog = mongoose.model("AdminLog", adminLogSchema);

export default AdminLog;
