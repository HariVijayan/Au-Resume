import express from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import User from '../../Login/Database_Models/User.js';
import ResumeDataDBModel from '../Database Models/resumeData.js';
import { PDFDocument } from 'pdf-lib';

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

const addMetadataToPdf = async (generatedPdf, name, resumeMetaData) => {
  const pdfDoc = await PDFDocument.load(generatedPdf);
    
    pdfDoc.setTitle(name+ "'s Resume");
    pdfDoc.setAuthor("Au Placement Helper");
    pdfDoc.setSubject(resumeMetaData);

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
};

function formatExperienceDuration(experience_year) {
  if (!experience_year) return null;

  experience_year = experience_year.trim().replace(/\s+/g, ' ');

  const regex = /([A-Za-z]+)?\s*(\d{4})\s*-\s*([A-Za-z]+|Present)?\s*(\d{4}|Present)/;

  const match = experience_year.match(regex);
  if (!match) return null;

  const [_, startMonthStr, startYearStr, endMonthStr, endYearStr] = match;

  const monthMap = {
    january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
    july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
  };

  const now = new Date();

  const startYear = parseInt(startYearStr, 10);
  const startMonth = startMonthStr ? monthMap[startMonthStr.toLowerCase()] : 0;

  const isPresent = endYearStr === "Present";

  const endYear = isPresent ? now.getFullYear() : parseInt(endYearStr, 10);
  let endMonth;

  if (endMonthStr && endMonthStr !== "Present") {
    endMonth = monthMap[endMonthStr.toLowerCase()];
  } else if (isPresent) {
    endMonth = now.getMonth(); // current month (0-based)
  } else {
    endMonth = startMonth; // fallback: assume December if month missing and not Present
  }


  const startDate = new Date(startYear, startMonth);
  const endDate = new Date(endYear, endMonth);

  let months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
               (endDate.getMonth() - startDate.getMonth());

  if (months < 0) return null;

  const years = Math.floor(months / 12);
  months = months % 12;

  return calculateExperienceYears(startMonth, startYear, endMonth, endYear)
}

function calculateExperienceYears(startMonth, startYear, endMonth, endYear) {
  const now = new Date();
  
  // Normalize inputs
  const sm = startMonth !== undefined ? startMonth : 0; // Jan
  const sy = parseInt(startYear);
  
  let em, ey;
  if (endYear === 'Present') {
    em = now.getMonth(); // 0-indexed
    ey = now.getFullYear();
  } else {
    ey = parseInt(endYear);
    em = endMonth !== undefined 
         ? endMonth 
         : (startMonth !== undefined ? startMonth : 11); // Use startMonth or Dec
  }

  // Compute raw total months
  const totalMonths = (ey - sy) * 12 + (em - sm);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // Map months to nearest lower quarter
  let fractionalYear = 0;
  if (months >= 9) fractionalYear = 0.75;
  else if (months >= 6) fractionalYear = 0.5;
  else if (months >= 3) fractionalYear = 0.25;

  const totalYears = years + fractionalYear;

  return `for a period of ${totalYears.toFixed(2)} years`;
}

function extractRelevantResumeDetails(resumeData) {
  const result = [];

  // ===== EDUCATION =====
  const educationData = resumeData.education;
  if (educationData) {
    let educationString = "=== Education ===";

    const eduSections = [
      { key: 'phd', label: 'PhD' },
      { key: 'postGraduate', label: 'Post Graduation' },
      { key: 'underGraduate', label: 'Under Graduation' },
      { key: 'diploma', label: 'Diploma' }
    ];

    for (const { key, label } of eduSections) {
      const entries = educationData[key];
      if (Array.isArray(entries) && entries.length > 0) {
        const sentences = entries.map(item => {
          const degree = item.name?.trim();
          const university = item.university?.trim();
          const year = item.year?.trim();
          const expertise = item.expertise?.trim(); // Only relevant for PhD
          const cgpa = item.cgpa?.trim(); // Not applicable for PhD
          const info = item.additionalInfo?.trim();

          let sentence = `Completed ${degree || "a degree"}`;
          if (expertise) sentence += ` with specialization in ${expertise}`;
          if (university) sentence += ` at ${university}`;
          if (year) sentence += ` during ${year}`;
          if (cgpa) sentence += `, achieving ${cgpa} CGPA`;
          if (info) sentence += `. Additional info: ${info}`;
          sentence += ".";
          return sentence;
        });

        educationString += `\n${sentences.join(" ")}`;
      }
    }

    if (educationData.hsc?.name?.trim()) {
      const hsc = educationData.hsc;
      educationString += `\nDid High Schooling at ${hsc.name}`;
      if (hsc.year) educationString += ` during ${hsc.year}`;
      if (hsc.grade) educationString += ` with a grade of ${hsc.grade}.`;
      if (hsc.additionalInfo) educationString += ` Additional info: ${hsc.additionalInfo}.`;
    }

    if (educationData.sslc?.name?.trim()) {
      const sslc = educationData.sslc;
      educationString += `\nDid SSLC at ${sslc.name}`;
      if (sslc.year) educationString += ` during ${sslc.year}`;
      if (sslc.grade) educationString += ` with a grade of ${sslc.grade}.`;
      if (sslc.additionalInfo) educationString += ` Additional info: ${sslc.additionalInfo}.`;
    }

    result.push(educationString);
  }

  // ===== EXPERIENCE =====
  const experienceData = resumeData.experience;
  if (Array.isArray(experienceData) && experienceData.length > 0) {
    let experienceString = "=== Experience ===";

    const expSentences = experienceData.map(exp => {
      const {
        style,
        company,
        location,
        year,
        designation,
        team,
        roles,
        description
      } = exp;

      let sentence = `Worked as ${designation || 'a team member'}`;
      const durationStr = formatExperienceDuration(year);
      if (durationStr) sentence += ` ${durationStr}`;
      if (team) sentence += ` in the ${team} team`;
      if (company) sentence += ` at ${company}`;
      if (location) sentence += `, located in ${location}`;
      sentence += ".";

      if (style === "style1" && Array.isArray(roles) && roles.length > 0) {
        sentence += ` Responsibilities include: ${roles.join(". ")}.`;
      } else if (style === "style2" && description?.trim()) {
        sentence += ` Responsibilities include: ${description}.`;
      }

      return sentence;
    });

    experienceString += `\n${expSentences.join(" \n")}`;
    result.push(experienceString);
  }

  // ===== SKILLS =====
  const skillsData = resumeData.skills;
  if (skillsData?.skillSet?.length) {
    const skillsString = "=== Skills ===\n" + skillsData.skillSet.join(", ");
    result.push(skillsString);
  }

  // ===== CERTIFICATIONS =====
  const certData = resumeData.certifications;
  if (certData?.certificationSet?.length) {
    const certString = "=== Certifications ===\n" + certData.certificationSet.join(", ");
    result.push(certString);
  }

  return result.join("\n\n");
}


router.post('/Resume', async (req, res) => {
  let {resumeData} = req.body;
  let templateType = resumeData.metaData.template;
  
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(401).json({ message: 'No token provided' });
  
  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  if (!user) return res.status(403).json({ message: 'User not found' });

  const login_email = user.email;

  const timestamp = getCurrentTimestamp();

  await ResumeDataDBModel.deleteMany({ login_email });
  const resumeDataDBEntry = new ResumeDataDBModel({
    login_email: login_email,
    updatedAt: timestamp,
    metaData: {
      template: resumeData.metaData.template,
    },
    personal: {
      name: resumeData.personal.name,
      bio: resumeData.personal.bio,
      mobile: resumeData.personal.mobile,
      email: resumeData.personal.email,
      location: resumeData.personal.location,
    },
  
    links: {
      linkedinDisplayName: resumeData.links.linkedinDisplayName,
      linkedinUrl: resumeData.links.linkedinUrl,
      githubDisplayName: resumeData.links.githubDisplayName,
      githubUrl: resumeData.links.githubUrl,
      websiteDisplayName: resumeData.links.websiteDisplayName,
      websiteUrl: resumeData.links.websiteUrl,
    },
  
    summary: resumeData.summary,
  
    education: {
      phd: resumeData.education.phd || [],
      postGraduate: resumeData.education.postGraduate || [],
      underGraduate: resumeData.education.underGraduate || [],
      diploma: resumeData.education.diploma || [],
      hsc: resumeData.education.hsc || {
        name: "",
        year: "",
        grade: "",
        additionalInfo: "",
      },
      sslc: resumeData.education.sslc || {
        name: "",
        year: "",
        grade: "",
        additionalInfo: "",
      },
    },
  
    experience: resumeData.experience || [],
  
    projects: resumeData.projects || [],
  
    skills: {
      type: resumeData.skills.type || "",
      skillSet: resumeData.skills.skillSet || [],
    },
  
    certifications: {
      type: resumeData.certifications.type || "",
      certificationSet: resumeData.certifications.certificationSet || [],
    },
  
    languages: resumeData.languages || [],
  
    customInput: resumeData.customInput || [],
  });
  

  await resumeDataDBEntry.save();

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

  footerFile = generateFooter(footerFile, timestamp);

  writeFileSync('../Output/Body.html', compiledTemplate);
  writeFileSync('../Output/Resume Data.txt', JSON.stringify(resumeData, null, 2));
  writeFileSync('../Output/Footer.html', footerFile);

  const pdfBuffer = await generatePdf(compiledTemplate, headerFile, footerFile);

  const resumeMetaData = extractRelevantResumeDetails(resumeData);
  writeFileSync('../Output/Resume Data.txt', resumeMetaData);

  const metadataAddedPdf = await addMetadataToPdf(pdfBuffer, resumeData.personal.name, resumeMetaData);

  res.type('application/pdf');
  res.end(metadataAddedPdf, 'binary');
});

export default router;