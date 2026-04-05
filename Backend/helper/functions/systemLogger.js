import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import istDateFormat from "./dateIstFormat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "../../logs");

const logSubdirs = ["info", "warn", "error"];
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

logSubdirs.forEach((subdir) => {
  const subdirPath = path.join(logsDir, subdir);
  if (!fs.existsSync(subdirPath)) {
    fs.mkdirSync(subdirPath, { recursive: true });
  }
});

const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
};

const getLogFilePath = (level) => {
  const today = new Date().toISOString().split("T")[0];
  const levelDir =
    level === LOG_LEVELS.ERROR
      ? "error"
      : level === LOG_LEVELS.WARN
        ? "warn"
        : "info";
  return path.join(logsDir, levelDir, `system-${today}.log`);
};

const formatLogEntry = (level, route, code, message, details = "") => {
  const timestamp = istDateFormat(new Date());
  const detailsStr = details ? ` | ${details}` : "";
  return `[${timestamp}] ${level} | ${route} | ${code} | ${message}${detailsStr}`;
};

const writeLog = (level, route, code, message, details) => {
  try {
    const logPath = getLogFilePath(level);
    const entry = formatLogEntry(level, route, code, message, details);
    fs.appendFileSync(logPath, entry + "\n", { encoding: "utf8" });
  } catch (error) {
    console.error("Failed to write log:", error.message);
  }
};

export const logError = (route, errorCode, message, additionalInfo = "") => {
  writeLog(LOG_LEVELS.ERROR, route, errorCode, message, additionalInfo);
};

export const logWarning = (route, code, message, additionalInfo = "") => {
  writeLog(LOG_LEVELS.WARN, route, code, message, additionalInfo);
};

export const logInfo = (route, code, message, additionalInfo = "") => {
  writeLog(LOG_LEVELS.INFO, route, code, message, additionalInfo);
};

export default { logError, logWarning, logInfo };
