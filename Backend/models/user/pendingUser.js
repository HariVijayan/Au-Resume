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

const PendingUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerNumber: { type: String, required: true },
  department: { type: String, required: true },
  courseType: { type: String, required: true },
  programme: { type: String, required: true },
  branch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 1 }, // 1 day expiration and will be removed automatically from the database
  createdAtFormatted: { type: String, default: formatISTTimestamp(new Date()) },
  encryptionSalt: { type: String, required: true },
});

export default mongoose.model("PendingUser", PendingUserSchema);
