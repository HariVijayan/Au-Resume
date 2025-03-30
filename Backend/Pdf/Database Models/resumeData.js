import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  login_email: { type: String, default: undefined, required: true },
  username: { type: String, default: undefined },
  small_bio: { type: String, default: undefined },
  phone_number: { type: String, default: undefined },
  emailid: { type: String, default: undefined },
  location: { type: String, default: undefined },
  linkedin: { type: String, default: undefined },
  linkedinurl: { type: String, default: undefined },
  github: { type: String, default: undefined },
  githuburl: { type: String, default: undefined },
  customlink: { type: String, default: undefined },
  customlinkurl: { type: String, default: undefined },
  summary: { type: String, default: undefined },

  education: [
    {
      phd: [
        {
          phd_name: { type: String, default: undefined },
          phd_university: { type: String, default: undefined },
          phd_year: { type: String, default: undefined },
          phd_exp: { type: String, default: undefined },
          phd_additional_info: { type: String, default: undefined },
        },
      ],
      pg_degree: [
        {
          pg_degree_name: { type: String, default: undefined },
          pg_degree_university: { type: String, default: undefined },
          pg_degree_year: { type: String, default: undefined },
          pg_degree_cgpa: { type: String, default: undefined },
          pg_degree_additional_info: { type: String, default: undefined },
        },
      ],
      ug_degree: [
        {
          ug_degree_name: { type: String, default: undefined },
          ug_degree_university: { type: String, default: undefined },
          ug_degree_year: { type: String, default: undefined },
          ug_degree_cgpa: { type: String, default: undefined },
          ug_degree_additional_info: { type: String, default: undefined },
        },
      ],
      diploma: [
        {
          diploma_name: { type: String, default: undefined },
          diploma_university: { type: String, default: undefined },
          diploma_year: { type: String, default: undefined },
          diploma_cgpa: { type: String, default: undefined },
          diploma_additional_info: { type: String, default: undefined },
        },
      ],
      hsc_name: { type: String, default: undefined },
      hsc_year: { type: String, default: undefined },
      hsc_grade: { type: String, default: undefined },
      hsc_additional_info: { type: String, default: undefined },
      sslc_name: { type: String, default: undefined },
      sslc_year: { type: String, default: undefined },
      sslc_grade: { type: String, default: undefined },
      sslc_additional_info: { type: String, default: undefined },
    },
  ],

  experience: [
    {
      style1: [
        {
          experience_company: { type: String, default: undefined },
          experience_location: { type: String, default: undefined },
          experience_year: { type: String, default: undefined },
          experience_designation: { type: String, default: undefined },
          experience_team: { type: String, default: undefined },
          experience_roles: { type: [String], default: undefined },
        },
      ],
      style2: [
        {
          experience_company: { type: String, default: undefined },
          experience_location: { type: String, default: undefined },
          experience_year: { type: String, default: undefined },
          experience_designation: { type: String, default: undefined },
          experience_team: { type: String, default: undefined },
          experience_description: { type: String, default: undefined },
        },
      ],
    },
  ],

  projects: {
    project1: {
      project_name: { type: String, default: undefined },
      project_link: { type: String, default: undefined },
      project_description: { type: String, default: undefined },
      project_tech: { type: String, default: undefined },
    },
  },

  skills: {
    style1: {
      skillset: { type: [String], default: undefined },
    },
    style2: {
      skillset: { type: String, default: undefined },
    },
  },

  certification: {
    style1: {
      certificationset: { type: [String], default: undefined },
    },
    style2: {
      certificationset: { type: String, default: undefined },
    },
  },

  languages: { type: [String], default: undefined },

  customdiv: [
    {
      customtitle: { type: String, default: undefined },
      customdivstyle1: { type: Boolean, default: undefined },
      customlist: { type: [String], default: undefined },
    },
    {
      customtitle: { type: String, default: undefined },
      customdivstyle2: { type: Boolean, default: undefined },
      customparagraph: { type: String, default: undefined },
    },
  ],
});

const Resume = mongoose.model("ResumeData", resumeSchema);

export default Resume;
