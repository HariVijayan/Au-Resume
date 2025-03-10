import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

Handlebars.registerHelper("or", (...args) => args.some(Boolean));

app.use(cors());
app.use(express.json());

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

const generateHeaderFooterPaths = () => ({
  headerPath: '/Resume Components/header.html',
  footerPath: '/Resume Components/footer.html',
  auLogoBase64Path: '/Images/Base64 Values/Au Logo.txt',
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
    path: 'Output/Resume Output.pdf',
    format: 'A4',
    printBackground: true,
    margin: { top: '15mm', bottom: '20mm', left: '15mm', right: '15mm' },
    displayHeaderFooter: true,
    headerTemplate: headerFile,
    footerTemplate: footerFile,
  });

  await page.screenshot({ path: 'Output/ScreenShot.png', fullPage: true });
  await browser.close();
  return pdfBuffer;
};

app.post('/generate-pdf', async (req, res) => {
  const resumeData = removeEmptyValues(req.body);

  const templatePath = '/Resume Components/body.html';
  const templateCssPath = '/Resume Components/body.css';
  const headerFooterPaths = generateHeaderFooterPaths();

  const templateFile = readFileSync(templatePath);
  const cssFile = readFileSync(templateCssPath);
  const headerFile = readFileSync(headerFooterPaths.headerPath);
  let footerFile = readFileSync(headerFooterPaths.footerPath);
  const auLogoFile = readFileSync(headerFooterPaths.auLogoBase64Path);

  let compiledTemplate = compileTemplate(templateFile.replace('<style></style>', `<style>${cssFile}</style>`), resumeData);
  footerFile = footerFile.replace('<img id="aulogo" src=""', `<img id="aulogo" src="data:image/png;base64,${auLogoFile}"`);

  const timestamp = getCurrentTimestamp();
  footerFile = generateFooter(footerFile, timestamp);

  writeFileSync('/Output/Body.html', compiledTemplate);
  writeFileSync('/Output/Resume Data.txt', JSON.stringify(resumeData, null, 2));
  writeFileSync('/Output/Footer.html', footerFile);

  const pdfBuffer = await generatePdf(compiledTemplate, headerFile, footerFile);

  res.type('application/pdf');
  res.end(pdfBuffer, 'binary');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
