import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "../../logs");

const LOG_LEVELS = ["info", "warn", "error"];
const KEEP_DAYS = 7;

export const rotateOldLogs = () => {
  try {
    const sevenDaysAgo = new Date(Date.now() - KEEP_DAYS * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    LOG_LEVELS.forEach((level) => {
      const levelDir = path.join(logsDir, level);

      if (!fs.existsSync(levelDir)) return;

      const files = fs
        .readdirSync(levelDir)
        .filter((f) => f.startsWith("system-"));

      files.forEach((file) => {
        const fileDate = file.match(/\d{4}-\d{2}-\d{2}/)?.[0];
        if (fileDate && fileDate < sevenDaysAgo) {
          const filePath = path.join(levelDir, file);
          fs.unlinkSync(filePath);
          console.log(`[LOG ROTATION] Deleted: ${level}/${file}`);
        }
      });
    });
  } catch (error) {
    console.error("Log rotation error:", error.message);
  }
};

export const scheduleLogRotation = () => {
  rotateOldLogs();

  const now = new Date();
  const istTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
  const nextMidnight = new Date(istTime);
  nextMidnight.setHours(24, 0, 0, 0);

  const timeUntilMidnight = nextMidnight - istTime;

  setTimeout(() => {
    rotateOldLogs();
    setInterval(rotateOldLogs, 24 * 60 * 60 * 1000);
  }, timeUntilMidnight);

  console.log(
    `[LOG SCHEDULER] Automatic log rotation scheduled to run daily at midnight IST`,
  );
};

export default { rotateOldLogs, scheduleLogRotation };
