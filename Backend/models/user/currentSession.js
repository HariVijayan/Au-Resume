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

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  email: { type: String, required: true },
  sessionId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 3 }, // 3 days expiration and will be removed automatically from the database
  createdAtFormatted: { type: String, default: formatISTTimestamp(new Date()) },
  expiresAt: { type: Date, required: true },
  expiresAtFormatted: { type: String, required: true },
});

export default mongoose.model("userActiveSession", sessionSchema);
