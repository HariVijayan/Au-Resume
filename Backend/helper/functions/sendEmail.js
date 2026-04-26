import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { logError, logInfo } from "./systemLogger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const readFileSync = (filePath) =>
  fs.readFileSync(path.join(__dirname, filePath), "utf8");

const compileTemplate = (templateFile, emailData) => {
  const compiledTemplate = Handlebars.compile(templateFile);
  return compiledTemplate(emailData);
};

async function sendEmailToUser(
  emailReceiver,
  emailSubject,
  emailHeading,
  emailBody,
) {
  try {
    const emailData = {
      EmailHeading: emailHeading,
      EmailBody: emailBody,
    };

    const templatePath = "../../resources/email/template.html"; //Path relative to this file

    let emailTemplate = readFileSync(templatePath);

    const compiledEmailTemplate = compileTemplate(emailTemplate, emailData);

    const aulogo = "./resources/images/aulogo.png"; //Path relative to the server.js main file

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailReceiver,
      subject: emailSubject,
      text: emailBody,
      html: compiledEmailTemplate,
      attachments: [
        {
          filename: "logo.png",
          path: aulogo,
          cid: "aulogo",
        },
      ],
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    logInfo(
      "/helper/functions/sendEmail",
      "EMAIL_SENT_SUCCESS",
      "Successfully sent email to user",
      `Sent email to ${emailReceiver}`,
    );

    return {
      success: true,
      responseDetails: {
        statusCode: 200,
        code: "SUCCESS",
        message: "Email sent successfully",
        timestamp: new Date().toISOString(),
      },
    };
  } catch (error) {
    logError(
      "/helper/functions/sendEmail",
      "EMAIL_SENDING_FAILURE",
      error,
      `email: ${emailReceiver}. Failed to send email`,
    );
    return {
      success: false,
      responseDetails: {
        statusCode: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: error,
        timestamp: new Date().toISOString(),
      },
    };
  }
}

export default sendEmailToUser;
