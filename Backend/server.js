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

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Function to compile Handlebars template
async function compileTemplate(templatePath, data) {
   const templateHtml = fs.readFileSync(templatePath, 'utf8');
   const template = Handlebars.compile(templateHtml);
   return template(data);
}

// Route to generate PDF
app.post('/generate-pdf', async (req, res) => {
   const resumeData = req.body;

   // Compile the template with Handlebars
   const bodyPath = path.join(__dirname, '/Resume Components/body.html');
   const pdfBody = await compileTemplate(bodyPath, resumeData);

   const headerPath = path.join(__dirname, '/Resume Components/header.html');
   const footerPath = path.join(__dirname, '/Resume Components/footer.html');
   const pdfHeader = fs.readFileSync(headerPath, 'utf8');
   let pdfFooter = fs.readFileSync(footerPath, 'utf8');

   const auLogoBase64Path = path.join(__dirname, '/Images/Base64 Values/aulogo.txt');
   const auLogoBase64 = fs.readFileSync(auLogoBase64Path, 'utf8');

   let date_time = new Date();

   // get current date
   // adjust 0 before single digit date
   let date = ("0" + date_time.getDate()).slice(-2);

   // get current month
   let month = ("0" + (date_time.getMonth() + 1)).slice(-2);

   // get current year
   let year = date_time.getFullYear();

   // get current hours
   let hours = date_time.getHours();

   // get current minutes
   let minutes = date_time.getMinutes();

   // get current seconds
   let seconds = date_time.getSeconds();

   const currentTime = (date + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds);

   pdfFooter = pdfFooter.replace('<img id="aulogo" src=""', `<img id="aulogo" src="data:image/png;base64,${auLogoBase64}"`);

   pdfFooter = pdfFooter.replace('<p>Approved by CUIC, downloaded from CUIC portal at', `<p>Approved by CUIC, downloaded from CUIC portal at ${currentTime}`);

   // Debug: Log the compiled HTML
   //console.log(pdfBody);

   const browser = await puppeteer.launch({
      headless: true
   });
   const page = await browser.newPage();
   await page.setContent(pdfBody, {
      waitUntil: 'load'
   });

   const pdfBuffer = await page.pdf({
      path: 'Resume Output.pdf',
      format: 'A4',
      printBackground: true,
      margin: {
         top: '20mm', // Extra space for the header
         bottom: '20mm', // Extra space for the footer
         left: '5mm',
         right: '5mm',
      },
      displayHeaderFooter: true,
      headerTemplate: pdfHeader,
      footerTemplate: pdfFooter,
   });

   await page.screenshot({
      path: 'ScreenShot.png',
      fullPage: true
   })


   await browser.close();

   res.type('application/pdf');
   res.end(pdfBuffer, 'binary');
});


app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});