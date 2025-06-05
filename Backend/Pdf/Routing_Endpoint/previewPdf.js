import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

Handlebars.registerHelper("or", (...args) => args.some(Boolean));
Handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

const readFileSync = (filePath) => fs.readFileSync(path.join(__dirname, filePath), 'utf8');
const writeFileSync = (filePath, data) => fs.writeFileSync(path.join(__dirname, filePath), data);

function removeEmptyValues(obj) {
  if (Array.isArray(obj)) {
      const filteredArray = obj
          .map(removeEmptyValues)
          .filter(item => item !== null); 
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
      const hasOnlyBooleans = Object.values(newObj).every(val => typeof val === "boolean");

      return Object.keys(newObj).length > 0 && !hasOnlyBooleans ? newObj : null;
  } else {
      return obj === "" ? null : obj;
  }
}

const getCurrentTimestamp = () => {
  const date_time = new Date();
  const date = String(date_time.getDate()).padStart(2, '0');
  const month = String(date_time.getMonth() + 1).padStart(2, '0');
  const year = date_time.getFullYear();
  const hours = String(date_time.getHours()).padStart(2, '0');
  const minutes = String(date_time.getMinutes()).padStart(2, '0');
  const seconds = String(date_time.getSeconds()).padStart(2, '0');
  return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

const generateFooter = (footerFile, timestamp) => {
  return footerFile.replace('<p>Developed by the Department of IST. Generated at</p>', 
                            `<p>Developed by the Department of IST. Generated at ${timestamp}</p>`);
};

const generateHeaderFooterPaths = (templateType) => ({
  headerPath: '../Templates/' + templateType + '/header.html',
  footerPath: '../Templates/' + templateType + '/footer.html',
  auLogoBase64Path: '../Images/Base64 Values/Au Logo.txt',
});

const compileTemplate = (templateFile, resumeData) => {
  const compiledTemplate = Handlebars.compile(templateFile);
  return compiledTemplate(resumeData);
};

const generatePdf = async (htmlContent, headerFile, footerFile) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });

  const pdfBuffer = await page.pdf({
    path: './Pdf/Output/Resume Output.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '20mm', left: '15mm', right: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: headerFile,
    footerTemplate: footerFile,
  });

  await page.screenshot({ path: './Pdf/Output/Screenshot.png', fullPage: true });
  await browser.close();
  return pdfBuffer;
};

router.post('/Resume', async (req, res) => {
  let {resumeData} = req.body;

  let templateType = resumeData.metaData.template;

  resumeData = removeEmptyValues(resumeData);

  if(templateType!="Template 1"){
    templateType = "Template 1" //Dummy code to modify if template values are different. If new templates are to be added, remove if condition.
  }
  const templatePath = '../Templates/' + templateType + '/body.html';
  const templateCssPath = '../Templates/' + templateType + '/body.css';

  const headerFooterPaths = generateHeaderFooterPaths(templateType);

  const templateFile = readFileSync(templatePath);
  const cssFile = readFileSync(templateCssPath);
  const headerFile = readFileSync(headerFooterPaths.headerPath);
  let footerFile = readFileSync(headerFooterPaths.footerPath);
  const auLogoFile = readFileSync(headerFooterPaths.auLogoBase64Path);

  let compiledTemplate = compileTemplate(templateFile.replace('<style></style>', `<style>${cssFile}</style>`), resumeData);
  footerFile = footerFile.replace('<img id="aulogo" src=""', `<img id="aulogo" src="data:image/png;base64,${auLogoFile}"`);

  const timestamp = getCurrentTimestamp();
  footerFile = generateFooter(footerFile, timestamp);

  writeFileSync('../Output/Body.html', compiledTemplate);
  writeFileSync('../Output/Resume Data.txt', JSON.stringify(resumeData, null, 2));
  writeFileSync('../Output/Footer.html', footerFile);

  const pdfBuffer = await generatePdf(compiledTemplate, headerFile, footerFile);

  res.type('application/pdf');
  res.end(pdfBuffer, 'binary');
});

export default router;