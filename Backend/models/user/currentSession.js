import mongoose from "mongoose";
import istDateFormat from "../../helper/dateIstFormat.js";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  email: { type: String, required: true },
  sessionId: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.CURRENT_SESSION_EXPIRY,
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

sessionSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  if (!this.expiresAt) {
    this.expiresAt = new Date(
      this.createdAt.getTime() + process.env.CURRENT_SESSION_EXPIRY * 1000
    );
  }

  if (!this.expiresAtFormatted) {
    this.expiresAtFormatted = istDateFormat(this.expiresAt);
  }

  next();
});

export default mongoose.model("userActiveSession", sessionSchema);
