import mongoose from "mongoose";
import istDateFormat from "../../helper/dateIstFormat.js";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  otpFor: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: process.env.OTP_EXPIRY },
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

otpSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  if (!this.expiresAt) {
    this.expiresAt = new Date(
      this.createdAt.getTime() + process.env.OTP_EXPIRY * 1000
    );
  }

  if (!this.expiresAtFormatted) {
    this.expiresAtFormatted = istDateFormat(this.expiresAt);
  }

  next();
});

export default mongoose.model("adminOtp", otpSchema);
