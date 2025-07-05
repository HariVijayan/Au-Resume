import mongoose from "mongoose";

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

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 720 }, // 12 minutes expiration and will be removed automatically from the database
  createdAtFormatted: { type: String, default: formatISTTimestamp(new Date()) },
  expiresAt: { type: Date, required: true },
  expiresAtFormatted: { type: String, required: true },
});

export default mongoose.model("userOtp", otpSchema);
