import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import {
   fileURLToPath
} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

async function compileTemplate(templatePath, data) {
   const templateHtml = fs.readFileSync(templatePath, 'utf8');
   const template = Handlebars.compile(templateHtml);
   return template(data);
}

app.post('/generate-pdf', async (req, res) => {
   const resumeData = req.body;

   let templatePath = path.join(__dirname, '/Resume Components/body.html');
   let templateFile = fs.readFileSync(templatePath, 'utf8');

   const templateCss = path.join(__dirname, '/Resume Components/body.css');
   const cssFile = fs.readFileSync(templateCss, 'utf8');

   templateFile = templateFile.replace('<style></style>', `<style>${cssFile}</style>`);

   let compiledTemplate = Handlebars.compile(templateFile);
   let pdfBody = compiledTemplate(resumeData);

   const htmlBodyOutputPath = path.join(__dirname, '/Output/Body.html');
   fs.writeFileSync(htmlBodyOutputPath, pdfBody);

   const headerPath = path.join(__dirname, '/Resume Components/header.html');
   const footerPath = path.join(__dirname, '/Resume Components/footer.html');
   const headerFile = fs.readFileSync(headerPath, 'utf8');
   let footerFile = fs.readFileSync(footerPath, 'utf8');

   const auLogoBase64Path = path.join(__dirname, '/Images/Base64 Values/Au Logo.txt');
   const auLogoFile = fs.readFileSync(auLogoBase64Path, 'utf8');

   footerFile = footerFile.replace('<img id="aulogo" src=""', `<img id="aulogo" src="data:image/png;base64,${auLogoFile}"`);

   
   let date_time = new Date();

   let date = ("0" + date_time.getDate()).slice(-2);

   let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

   let year = date_time.getFullYear();

   let hours = String(date_time.getHours()).padStart(2, '0');

   let minutes = String(date_time.getMinutes()).padStart(2, '0');

   let seconds = String(date_time.getSeconds()).padStart(2, '0');

   const currentTime = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;

   footerFile = footerFile.replace('<p>Developed by the Department of IST. Generated at</p>', `<p>Developed by the Department of IST. Generated at ${currentTime}</p>`);

   const htmlFooterOutputPath = path.join(__dirname, '/Output/Footer.html');
   fs.writeFileSync(htmlFooterOutputPath, footerFile);

   const browser = await puppeteer.launch({
      headless: true
   });
   const page = await browser.newPage();
   await page.setContent(pdfBody, {
      waitUntil: 'load'
   });

   const pdfBuffer = await page.pdf({
      path: 'Output/Resume Output.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
         top: '15mm', 
         bottom: '20mm', 
         left: '15mm',
         right: '15mm',
      },
      displayHeaderFooter: true,
      headerTemplate: headerFile,
      footerTemplate: footerFile,
   });

   await page.screenshot({
      path: 'Output/ScreenShot.png',
      fullPage: true
   })


   await browser.close();

   res.type('application/pdf');
   res.end(pdfBuffer, 'binary');
});


app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});