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

const logSchema = new mongoose.Schema({
  accountEmail: { type: String, required: true },
  logCreatedByEmail: { type: String, required: true },
  logCategory: { type: String, default: null },
  logDetails: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 365 * 10,
  }, // 10 years expiration and will be removed automatically from the database
  createdAtFormatted: { type: String, default: formatISTTimestamp(new Date()) },
});

export default mongoose.model("userLog", logSchema);
