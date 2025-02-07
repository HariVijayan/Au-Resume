import React, { useState } from 'react';
import axios from 'axios';

const GeneratePDF = () => {
    const [resumeData, setResumeData] = useState({
        username: "John Doe",
  small_bio: "Developer|Designer|Freelancer",
  phone_number: "+91 9090909099",
  emailid: "john@gmail.com",
  location: "Chennai, India",
  linkedin: "linkedin.com/John",
  linkedinlink: "https://www.linkedin.com/John",
  github: "github.com/John",
  githublink: "https://www.github.com/John",
  summary: "I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies. I specialize in building scalable web applications using modern frameworks and cloud technologies.",
  education: [
    {
      phd: [
        {
          phd_name: "Ph.D in Network Security",
          phd_university: "Princeton University",
          phd_year: "2024 - 2029",
          phd_exp: "Expertise: Networking, Security, Machine Learning, Hash Algorithms",
          phd_additional_info: "Widely accepted research in cybersecurity protocols and machine learning"
        }
      ],
      pg_degree: [
        {
          pg_degree_name: "Master of Computer Applications",
          pg_degree_university: "Princeton University",
          pg_degree_year: "2022 - 2024",
          pg_degree_cgpa: "CGPA: 9.5",
          pg_additional_info: "As of Semester 3"
        }
      ],
      ug_degree: [
        {
          ug_degree_name: "B.Sc. Computer Science",
          ug_degree_university: "Princeton University",
          ug_degree_year: "2019 - 2022",
          ug_degree_cgpa: "CGPA: 8.7",
          ug_additional_info: "Distinction Grade"
        }
      ],
      diploma: [
        {
          diploma_name: "Diploma in Technology",
          diploma_university: "Princeton University",
          diploma_year: "2017 - 2019",
          diploma_cgpa: "CGPA: 9.5",
          diploma_additional_info: "Distinction Grade"
        }
      ],
      hsc_name: "Don Bosco School",
      hsc_year: "2015 - 2017",
      hsc_grade: "Grade: 68.0",
      hsc_additional_info: "State Board",
      sslc_name: "Don Bosco School",
      sslc_year: "2014 - 2015",
      sslc_grade: "Grade: 68.0",
      sslc_additional_info: "State Board"
    }
  ],
  skills: [
    {
      skillstyle1: true,
      skillset: ["Web Development", "Cloud Deployment", "Machine Learning"]
    }
  ],
  projects: [
    {
      project_name: "Project 1",
      project_link: "https://github.com/John/Project1",
      project_description: "Developed and maintained the company website with advanced features like authentication, user profiles, and data management.",
      project_tech: "HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"
    },
    {
      project_name: "Project 2",
      project_link: "https://github.com/John/Project2",
      project_description: "Built a responsive and interactive e-commerce platform with integrated payment systems and a product recommendation engine.",
      project_tech: "HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"
    }
  ],
  experience: [
    {
      experience_company: "Amazon India",
      experience_location: "Bangalore",
      experience_year: "2022 - Present",
      experience_designation: "Software Developer",
      experience_team: "Cloud Deployment",
      experience_roles: [
        "Developed and maintained the company website using modern JavaScript frameworks",
        "Collaborated with cross-functional teams to deploy cloud solutions and improve scalability"
      ]
    }
  ],
  certifications: [
    {
      certificationstyle1: true,
      certificationset: [
        "AWS Certified Developer (www.awsverification.com/ghvsgv212)",
        "Google Cloud Certified",
        "Machine Learning Expert"
      ]
    }
  ],
  languages: [
    "English (Full professional proficiency)",
    "Tamil (Mother Tongue)",
    "Hindi (Limited working proficiency)"
  ],
  customdiv:
  [
    {
      customtitle: "Custom Title 1",
      customdivstyle1: true,
      customlist: ["Custom Point 1", "Custom Point 2", "Custom Point 3"]
    },
    {
      customtitle: "Custom Title 2",
      customdivstyle2: true,
      customparagraph: "Custom Point 1 Custom Point 2 Custom Point 3"
    },

  ]
    });

    const handleGeneratePDF = async () => {
        try {
            const response = await axios.post('http://localhost:5000/generate-pdf', resumeData, {
                responseType: 'arraybuffer', // Expect the PDF as a buffer
            });

            // Create a Blob from the response
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'resume.pdf'; // Set default file name
            link.click(); // Trigger download
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <div>
            <h1>Resume Generator</h1>
            <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
    );
};

export default GeneratePDF;
