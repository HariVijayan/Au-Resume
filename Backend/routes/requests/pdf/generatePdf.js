import express from "express";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import User from "../../../models/user/user.js";
import istDateFormat from "../../../helper/functions/dateIstFormat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

Handlebars.registerHelper("or", (...args) => args.some(Boolean));
Handlebars.registerHelper("eq", function (a, b) {
  return a === b;
});

const readFileSync = (filePath) =>
  fs.readFileSync(path.join(__dirname, filePath), "utf8");
const writeFileSync = (filePath, data) =>
  fs.writeFileSync(path.join(__dirname, filePath), data);

function removeEmptyValues(obj) {
  if (Array.isArray(obj)) {
    const filteredArray = obj
      .map(removeEmptyValues)
      .filter((item) => item !== null);
    return filteredArray.length > 0 ? filteredArray : null;
  } else if (typeof obj === "object" && obj !== null) {
    let newObj = {};
    for (let key in obj) {
      if (key === "_id") continue; // Skip "_id" fields
      const cleanedValue = removeEmptyValues(obj[key]);
      if (cleanedValue !== null) {
        newObj[key] = cleanedValue;
      }
    }
    const hasOnlyBooleans = Object.values(newObj).every(
      (val) => typeof val === "boolean"
    );

    return Object.keys(newObj).length > 0 && !hasOnlyBooleans ? newObj : null;
  } else {
    return obj === "" ? null : obj;
  }
}

const generateFooter = (footerFile, timestamp) => {
  return footerFile.replace(
    "<p>Developed by the Department of IST. Generated at</p>",
    `<p>Developed by the Department of IST. Generated at ${timestamp}</p>`
  );
};

const generateHeaderFooterPaths = (templateType) => ({
  headerPath: "../../../resources/templates/" + templateType + "/header.html",
  footerPath: "../../../resources/templates/" + templateType + "/footer.html",
  auLogoBase64Path: "../../../resources/images/base64/aulogo.txt",
});

const compileTemplate = (templateFile, resumeData) => {
  const compiledTemplate = Handlebars.compile(templateFile);
  return compiledTemplate(resumeData);
};

const generatePdf = async (htmlContent, headerFile, footerFile) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "load" });

  const pdfBuffer = await page.pdf({
    path: "./output/Resume Output.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "15mm", bottom: "20mm", left: "15mm", right: "15mm" },
    displayHeaderFooter: true,
    headerTemplate: headerFile,
    footerTemplate: footerFile,
  });

  await page.screenshot({
    path: "./output/Screenshot.png",
    fullPage: true,
  });
  await browser.close();
  return pdfBuffer;
};

router.post("/Resume", async (req, res) => {
  let { resumeData } = req.body;
  let templateType = resumeData.metaData.template;

  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return res.status(401).json({ message: "No token provided" });

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) return res.status(403).json({ message: "User not found" });

  const timestamp = istDateFormat(new Date());

  resumeData = removeEmptyValues(resumeData);

  if (templateType != "template1") {
    templateType = "template1"; //Dummy code to modify if template values are different. If new templates are to be added, remove if condition.
  }
  const templatePath =
    "../../../resources/templates/" + templateType + "/body.html";
  const templateCssPath =
    "../../../resources/templates/" + templateType + "/body.css";

  const headerFooterPaths = generateHeaderFooterPaths(templateType);

  const templateFile = readFileSync(templatePath);
  const cssFile = readFileSync(templateCssPath);
  const headerFile = readFileSync(headerFooterPaths.headerPath);
  let footerFile = readFileSync(headerFooterPaths.footerPath);
  const auLogoFile = readFileSync(headerFooterPaths.auLogoBase64Path);

  let compiledTemplate = compileTemplate(
    templateFile.replace("<style></style>", `<style>${cssFile}</style>`),
    resumeData
  );
  footerFile = footerFile.replace(
    '<img id="aulogo" src=""',
    `<img id="aulogo" src="data:image/png;base64,${auLogoFile}"`
  );

  footerFile = generateFooter(footerFile, timestamp);

  writeFileSync("../../../output/Body.html", compiledTemplate);
  writeFileSync(
    "../../../output/Resume Data.txt",
    JSON.stringify(resumeData, null, 2)
  );
  writeFileSync("../../../output/Footer.html", footerFile);

  const pdfBuffer = await generatePdf(compiledTemplate, headerFile, footerFile);

  res.type("application/pdf");
  res.end(pdfBuffer, "binary");
});

export default router;
