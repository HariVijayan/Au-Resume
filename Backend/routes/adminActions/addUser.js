import express from "express";
import adminUser from "../../models/admin/admin.js";
import adminOtp from "../../models/admin/otp.js";
import userDBModel from "../../models/user/user.js";
import adminCurrentSession from "../../models/admin/currentSession.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

function csvToNumberArray(input) {
  const trimmedInput = input.replace(/\s+/g, "");
  const numArray = trimmedInput.split(",").map((value) => {
    const num = Number(value);
    if (isNaN(num)) {
      return null;
    }
    return num;
  });

  return numArray.filter((num) => num !== null);
}

const generateStrongPassword = (length = 8) => {
  const characters =
    "ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz0123456789!@#$%&*()";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

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

router.post("/addNewUser", async (req, res) => {
  const {
    newAdditionType,
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    skipRegNo,
    commonUserDept,
    commonUserCourseType,
    commonUserProgramme,
    commonUserBranch,
    newUserEmail,
    newUserRegNo,
    newUserDept,
    newUserCourseType,
    newUserProgramme,
    newUserBranch,
    otpInput,
  } = req.body;

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }

    const { userId, sessionId } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const session = await adminCurrentSession.findOne({ userId, sessionId });
    if (!session || session.expiresAt < Date.now()) {
      return res
        .status(403)
        .json({ message: "Session expired. Please log in again." });
    }

    const adminEmail = session.email;

    const user = await adminUser.findOne({ email: adminEmail });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Unauthorised access. Not an admin." });
    }

    const storedOtp = await adminOtp.findOne({
      email: adminEmail,
      otp: otpInput,
    });

    if (!storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    if (storedOtp.expiresAt < Date.now()) {
      await adminOtp.deleteMany({ adminEmail });
      return res.status(400).json({ message: "OTP expired" });
    }

    let finalUserList = [];
    let skippableRegNoList = csvToNumberArray(skipRegNo);

    if (newAdditionType === "Single") {
      const newUser = await userDBModel.findOne({ email: newUserEmail });
      if (newUser) {
        return res.status(400).json({ message: "User already exists." });
      }
      if (!newUser) {
        const newUserPassword = generateStrongPassword(8);
        const createdAt = new Date(Date.now());

        const hashedPassword = crypto
          .createHash("sha256")
          .update(newUserPassword)
          .digest("hex");

        const salt = crypto.randomBytes(16);
        const saltBase64 = salt.toString("base64");

        finalUserList.push({
          email: newUserEmail,
          password: hashedPassword,
          registerNumber: newUserRegNo,
          department: newUserDept,
          courseType: newUserCourseType,
          programme: newUserProgramme,
          branch: newUserBranch,
          createdAt: createdAt,
          createdAtFormatted: formatISTTimestamp(createdAt),
          encryptionSalt: saltBase64,
        });
      }
    } else if (newAdditionType === "Multiple") {
      for (let i = commonRegNoStart; i <= commonRegNoEnd; i++) {
        if (skippableRegNoList.includes(i)) {
          continue;
        }
        let iterableValue = i;
        if (i < 10) {
          iterableValue = `0${i}`;
        }
        const regNo = `${commonRegNoPrefix}${iterableValue}`;
        const newUserRegNoEmail = `${regNo}${commonEmailSuffix}`;

        const newUser = await userDBModel.findOne({ email: newUserRegNoEmail });

        if (newUser) {
          return res.status(400).json({ message: "User already exists." });
        }

        if (!newUser) {
          const newUserPassword = generateStrongPassword(8);
          const createdAt = new Date(Date.now());

          const hashedPassword = crypto
            .createHash("sha256")
            .update(newUserPassword)
            .digest("hex");

          const salt = crypto.randomBytes(16);
          const saltBase64 = salt.toString("base64");

          finalUserList.push({
            email: newUserRegNoEmail,
            password: hashedPassword,
            registerNumber: regNo,
            department: commonUserDept,
            courseType: commonUserCourseType,
            programme: commonUserProgramme,
            branch: commonUserBranch,
            createdAt: createdAt,
            createdAtFormatted: formatISTTimestamp(createdAt),
            encryptionSalt: saltBase64,
          });
        }
      }
    }

    const result = await userDBModel.insertMany(finalUserList);
    return res
      .status(200)
      .json({ message: `${result.length} users inserted successfully.` });
  } catch (error) {
    console.error("Request OTP error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
