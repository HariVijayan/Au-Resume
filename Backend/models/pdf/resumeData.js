import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  login_email: { type: String, default: undefined, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 365 * 5 }, // 5 years expiration and will be removed automatically from the database
  createdAtFormatted: { type: String, default: "" },
  encryptedResumeData: { type: String, default: "" },
});

const Resume = mongoose.model("ResumeData", resumeSchema);

export default Resume;
