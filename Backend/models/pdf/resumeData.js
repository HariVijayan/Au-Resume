import mongoose from "mongoose";
import istDateFormat from "../../helper/functions/dateIstFormat.js";

const resumeSchema = new mongoose.Schema({
  login_email: { type: String, default: undefined, required: true },
  encryptedResumeData: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: process.env.SAVED_RESUME_EXPIRY,
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

resumeSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  if (!this.expiresAt) {
    this.expiresAt = new Date(
      this.createdAt.getTime() + process.env.SAVED_RESUME_EXPIRY * 1000
    );
  }

  if (!this.expiresAtFormatted) {
    this.expiresAtFormatted = istDateFormat(this.expiresAt);
  }

  next();
});

export default mongoose.model("ResumeData", resumeSchema);
