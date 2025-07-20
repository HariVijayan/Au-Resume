import mongoose from "mongoose";
import istDateFormat from "../../helper/dateIstFormat.js";

const adminUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdBy: { type: String, default: "System" },
  accountType: { type: String, default: "Analytics" },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lockUntilFormatted: { type: String, default: null },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdAtFormatted: {
    type: String,
  },
});

adminUserSchema.pre("save", function (next) {
  if (!this.createdAtFormatted) {
    this.createdAtFormatted = istDateFormat(this.createdAt);
  }

  next();
});

export default mongoose.model("adminList", adminUserSchema);
