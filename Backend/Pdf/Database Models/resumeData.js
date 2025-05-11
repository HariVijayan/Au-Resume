import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  login_email: { type: String, default: undefined, required: true },
  updatedAt: { type: String, default: "" },
  metaData:{
    template: { type: String, default: "" },
  },
  personal: {
    name: { type: String, default: "" },
    bio: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  links: {
    linkedinDisplayName: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    githubDisplayName: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    websiteDisplayName: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
  },
  summary: { type: String, default: "" },

  education: {
    phd: [
      {
        name: { type: String, default: "" },
        university: { type: String, default: "" },
        year: { type: String, default: "" },
        expertise: { type: String, default: "" },
        additionalInfo: { type: String, default: "" },
      },
    ],
    postGraduate: [
      {
        name: { type: String, default: "" },
        university: { type: String, default: "" },
        year: { type: String, default: "" },
        cgpa: { type: String, default: "" },
        additionalInfo: { type: String, default: "" },
      },
    ],
    underGraduate: [
      {
        name: { type: String, default: "" },
        university: { type: String, default: "" },
        year: { type: String, default: "" },
        cgpa: { type: String, default: "" },
        additionalInfo: { type: String, default: "" },
      },
    ],
    diploma: [
      {
        name: { type: String, default: "" },
        university: { type: String, default: "" },
        year: { type: String, default: "" },
        cgpa: { type: String, default: "" },
        additionalInfo: { type: String, default: "" },
      },
    ],
    hsc: {
      name: { type: String, default: "" },
      year: { type: String, default: "" },
      grade: { type: String, default: "" },
      additionalInfo: { type: String, default: "" },
    },
    sslc: {
      name: { type: String, default: "" },
      year: { type: String, default: "" },
      grade: { type: String, default: "" },
      additionalInfo: { type: String, default: "" },
    },
  },

  experience: [
    {
      style: { type: String, default: "" },
      company: { type: String, default: "" },
      location: { type: String, default: "" },
      year: { type: String, default: "" },
      designation: { type: String, default: "" },
      team: { type: String, default: "" },
      roles: { type: [String], default: [] },
      description: { type: String, default: "" },
    },
  ],

  projects: [
    {
      name: { type: String, default: "" },
      link: { type: String, default: "" },
      description: { type: String, default: "" },
      techStack: { type: String, default: "" },
    },
  ],

  skills: {
    type: { type: String, default: "" },
    skillSet: { type: [String], default: [] },
  },

  certifications: {
    type: { type: String, default: "" },
    certificationSet: { type: [String], default: [] },
  },

  languages: { type: [String], default: [] },

  customInput: [
    {
      title: { type: String, default: "" },
      style: { type: String, default: "" },
      listValues: { type: [String], default: [] },
      paraValues: { type: String, default: "" },
    },
  ],
});

const Resume = mongoose.model("ResumeData", resumeSchema);

export default Resume;
