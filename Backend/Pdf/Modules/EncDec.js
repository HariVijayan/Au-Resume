import crypto from "crypto";

const ivLength = 12;

// Derive a 256-bit key from password and salt using PBKDF2
const deriveKey = (password, salt) => {
  return new Promise((resolve, reject) => {
    if (!password || !salt) {
      return reject(new Error("Password or salt missing"));
    }
    crypto.pbkdf2(password, salt, 100000, 32, "sha256", (err, key) => {
      if (err) {
        console.error("pbkdf2 error:", err);
        return reject(err);
      }
      resolve(key);
    });
  });
};

// Encrypt a plaintext string into { iv, ciphertext, tag }
const encryptString = (plaintext, key) => {
  try {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();

    return {
      iv: iv.toString("base64"),
      ciphertext: encrypted.toString("base64"),
      tag: tag.toString("base64"),
    };
  } catch (err) {
    console.error("Encryption error:", err);
    throw err;
  }
};

// Recursively encrypt all strings/numbers/booleans in objects or arrays
const encryptData = async (data, key) => {
  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => encryptData(item, key)));
  }
  if (data && typeof data === "object") {
    const result = {};
    for (const [prop, value] of Object.entries(data)) {
      result[prop] = await encryptData(value, key);
    }
    return result;
  }
  if (typeof data === "string" && data.trim() !== "") {
    return encryptString(data, key);
  }
  if (typeof data === "number" || typeof data === "boolean") {
    return encryptString(String(data), key);
  }
  // For null, undefined, empty string, return as is
  return data;
};

// Check if an object is an encrypted field (has iv, ciphertext, tag)
const isEncryptedField = (obj) =>
  obj &&
  typeof obj === "object" &&
  typeof obj.iv === "string" &&
  typeof obj.ciphertext === "string" &&
  typeof obj.tag === "string";

// Decrypt a single encrypted field object
const decryptString = (encryptedObj, key) => {
  try {
    const iv = Buffer.from(encryptedObj.iv, "base64");
    const ciphertext = Buffer.from(encryptedObj.ciphertext, "base64");
    const tag = Buffer.from(encryptedObj.tag, "base64");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return decrypted.toString("utf8");
  } catch (err) {
    console.error("Decryption failed:", err.message);
    return null;
  }
};

// Recursively decrypt all encrypted fields in objects or arrays
const decryptData = async (data, key) => {
  if (Array.isArray(data)) {
    return Promise.all(data.map((item) => decryptData(item, key)));
  }
  if (data && typeof data === "object") {
    if (isEncryptedField(data)) {
      return decryptString(data, key);
    }
    const result = {};
    for (const [prop, value] of Object.entries(data)) {
      result[prop] = await decryptData(value, key);
    }
    return result;
  }
  // For primitives or null, return as is
  return data;
};

export default {
  deriveKey,
  encryptData,
  decryptData,
};
