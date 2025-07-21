import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

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
  emailBody
) {
  try {
    const emailData = {
      EmailHeading: emailHeading,
      EmailBody: emailBody,
    };

    const templatePath = "../../resources/email/template.html";

    let emailTemplate = readFileSync(templatePath);

    const compiledEmailTemplate = compileTemplate(emailTemplate, emailData);

    const aulogo = "./resources/images/aulogo.png";

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
  } catch (error) {
    return {
      Success: "NO",
      HtmlCode: 500,
      Reason: error,
    };
  }

  return {
    Success: "YES",
    HtmlCode: 200,
  };
}

export default sendEmailToUser;
