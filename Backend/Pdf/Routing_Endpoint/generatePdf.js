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
  const educationData = resumeData.education?.[0];
  const eduSections = ['phd', 'pg_degree', 'ug_degree', 'diploma'];
  const eduLabels = {
    phd: "PhD",
    pg_degree: "Post Graduation",
    ug_degree: "Under Graduation",
    diploma: "Diploma"
  };

  if (educationData) {
    let educationString = "=== Education ===";
    
    for (const section of eduSections) {
      const entries = educationData[section];
      if (Array.isArray(entries) && entries.length > 0) {
        const sentences = entries.map(item => {
          const degree = item[`${section}_name`]?.trim();
          const university = item[`${section}_university`]?.trim();
          const year = item[`${section}_year`]?.trim();
          const expertise = item[`${section}_exp`] || "";
          const cgpa = item[`${section}_cgpa`]?.trim();
          const info = item[`${section}_additional_info`]?.trim();

          let sentence = `Completed ${degree || "a degree"}`;
          if (expertise) sentence += ` with specialization in ${expertise}`;
          if(university) sentence +=  ` at ${university}`;
          if (year) sentence += ` during ${year}`;
          if(cgpa) sentence += `, achieving ${cgpa} CGPA`;
          if (info) sentence += `. Additional info: ${info}`;
          sentence += ".";
          return sentence;
        });

        educationString += `\n${sentences.join(" ")}`;
      }
    }

    if (educationData.hsc_name?.trim()) {
      educationString += `\nDid High Schooling at ${educationData.hsc_name}`;
      if(educationData.hsc_year) educationString += ` during ${educationData.hsc_year}`;
      if(educationData.hsc_grade) educationString += ` with a grade of ${educationData.hsc_grade}.`;
      if(educationData.hsc_additional_info) educationString += ` Additional info: ${educationData.hsc_additional_info}.`;
    }

    if (educationData.sslc_name?.trim()) {
      educationString += `\nDid SSLC at ${educationData.sslc_name}`;
      if(educationData.sslc_year) educationString += ` during ${educationData.sslc_year}`;
      if(educationData.sslc_grade) educationString += ` with a grade of ${educationData.sslc_grade}.`;
      if(educationData.sslc_additional_info) educationString += ` Additional info: ${educationData.sslc_additional_info}.`;
    }

    result.push(educationString);
  }

  // ===== EXPERIENCE =====
  const experienceData = resumeData.experience?.[0];
  if (experienceData) {
    let experienceString = "=== Experience ===";

    // Style 1: Roles array-based
    const style1Entries = experienceData.style1?.map(exp => {
      const { experience_company, experience_location, experience_year, experience_designation, experience_team, experience_roles } = exp;

      let sentence = `Worked as ${experience_designation || 'a member'}`;
      const durationStr = formatExperienceDuration(experience_year);
      if (durationStr) sentence += ` ${durationStr}`;
      if(experience_team) sentence += ` in the ${experience_team} team`;
      if(experience_company) sentence += ` at ${experience_company}`;
      if(experience_location) sentence += `, located in ${experience_location}`;

      sentence += ".";
      if (Array.isArray(experience_roles) && experience_roles.length > 0) {
        sentence += ` Responsibilities include: ${experience_roles.join(". ")}.`;
      }
      return sentence;
    }) || [];

    // Style 2: Description based
    const style2Entries = experienceData.style2?.map(exp => {
      const { experience_company, experience_location, experience_year, experience_designation, experience_team, experience_description } = exp;

      
      let sentence = `Worked as ${experience_designation || 'a member'}`;
      const durationStr = formatExperienceDuration(experience_year);
      if (durationStr) sentence += ` ${durationStr}`;
      if(experience_team) sentence += ` in the ${experience_team} team`;
      if(experience_company) sentence += ` at ${experience_company}`;
      if(experience_location) sentence += `, located in ${experience_location}`;

      sentence += ".";
      if (experience_description?.trim()) {
        sentence += ` Responsibilities include: ${experience_description}.`;
      }
      return sentence;
    }) || [];

    const allExpSentences = [...style1Entries, ...style2Entries];
    if (allExpSentences.length > 0) {
      experienceString += `\n${allExpSentences.join(" \n")}`;
      result.push(experienceString);
    }
  }

  // ===== SKILLS =====
  const skills = resumeData.skills?.style1?.skillset?.length
    ? resumeData.skills.style1.skillset
    : resumeData.skills?.style2?.skillset?.trim()
      ? [resumeData.skills.style2.skillset]
      : null;

  if (skills) {
    const skillsString = "=== Skills ===\n" + skills.join(", ");
    result.push(skillsString);
  }

  // ===== CERTIFICATION =====
  const certs = resumeData.certification?.style1?.certificationset?.length
    ? resumeData.certification.style1.certificationset
    : resumeData.certification?.style2?.certificationset?.trim()
      ? [resumeData.certification.style2.certificationset]
      : null;

  if (certs) {
    const certsString = "=== Certifications ===\n" + certs.join(", ");
    result.push(certsString);
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

  await ResumeDataDBModel.deleteMany({ login_email });
  const resumeDataDBEntry = new ResumeDataDBModel({
    login_email: login_email,
    username: resumeData.username,
    small_bio: resumeData.small_bio,
    phone_number: resumeData.phone_number,
    emailid: resumeData.emailid,
    location: resumeData.location,
    linkedin: resumeData.linkedin,
    linkedinurl: resumeData.linkedinurl,
    github: resumeData.github,
    githuburl: resumeData.githuburl,
    customlink: resumeData.customlink,
    customlinkurl: resumeData.customlinkurl,
    summary: resumeData.summary,
  
    education: resumeData.education,

    experience: resumeData.experience,

    projects: resumeData.projects,

    skills: resumeData.skills,

    certification: resumeData.certification,

    languages: resumeData.languages,

    customdiv: resumeData.customdiv,
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

  const timestamp = getCurrentTimestamp();
  footerFile = generateFooter(footerFile, timestamp);

  writeFileSync('../Output/Body.html', compiledTemplate);
  writeFileSync('../Output/Resume Data.txt', JSON.stringify(resumeData, null, 2));
  writeFileSync('../Output/Footer.html', footerFile);

  const pdfBuffer = await generatePdf(compiledTemplate, headerFile, footerFile);

  const resumeMetaData = extractRelevantResumeDetails(resumeData);
  writeFileSync('../Output/Resume Data.txt', resumeMetaData);

  const metadataAddedPdf = await addMetadataToPdf(pdfBuffer, resumeData.username, resumeMetaData);

  res.type('application/pdf');
  res.end(metadataAddedPdf, 'binary');
});

export default router;