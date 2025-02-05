import React, { useState } from 'react';
import axios from 'axios';

const GeneratePDF = () => {
    const [resumeData, setResumeData] = useState({
        username: "Hari Prasad V",
        small_bio: "Developer|Designer|Freelancer",
        phone_number: "+91 9090909099",
        emailid: "hari@gmail.com",
        linkedin: "www.linkedin.com/Hari",
        linkedinlink: "https://www.linkedin.com/Hari",
        github: "www.github.com/Hari",
        githublink: "https://www.github.com/Hari",
        summary:"I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies.I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies.",
        education: [
            {
                phd: 
                [
                    {
                        phd_name: "Ph.D in Network Security",
                        phd_university: "Anna University",
                        phd_year: "2017 - 2023",
                        phd_exp: "Expertise : Networking, Security, Machine Learning, Hash Algorithms",
                        phd_additional_info: "Widely accepted research"
                    }
                ],
                pg_degree: 
                [
                    {
                        pg_degree_name: "Master of Computer Applications",
                        pg_degree_university: "Anna University",
                        pg_degree_year: "2022 - 2024",
                        pg_degree_cgpa: "CGPA : 9.5",
                        pg_additional_info: "As of Semester 3"
                    }
                ],
                ug_degree: 
                [
                    {
                        ug_degree_name: "B.Sc. Computer Science",
                        ug_degree_university: "Anna University",
                        ug_degree_year: "2019 - 2022",
                        ug_degree_cgpa: "CGPA : 8.7",
                        ug_additional_info: "Distinction Grade"
                    }
                ],
                diploma: 
                [
                    {
                        diploma_name: "Diploma in Technology",
                        diploma_university: "Anna University",
                        diploma_year: "2017 - 2019",
                        diploma_cgpa: "CGPA : 9.5",
                        diploma_additional_info: "Distinction Grade"
                    }
                ],
                hsc_name:"Jawahar School", 
                hsc_year:"2015 - 2017", 
                hsc_grade: "Grade : 68.0",
                hsc_additional_info: "State Board",
                sslc_name:"Jawahar School", 
                sslc_year:"2014 - 2015", 
                sslc_grade: "Grade : 68.0",
                sslc_additional_info: "State Board"
            }
        ],
        skills: 
        [
            {
                skillstyle1: true, 
                skillset: ["Web Development", "Cloud Deployment", "Machine Learning"]
            },
            {
                skillstyle2: true, 
                skillset: "Web Development, Cloud Deployment, Machine Learning"
            }
        ],
        projects:
        [
            {
                project_name:"Project 1", 
                project_link:"https://github.com/Hari/Project1",
                project_description:"Developed and maintained the company website", 
                project_tech: "HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"
            },
            {
                project_name:"Project 2", 
                project_link:"https://github.com/Hari/Project2",
                project_description:"Developed and maintained the company website", 
                project_tech: "HTML, CSS, JavaScript, ReactJS, NodeJS, MongoDB"
            }
        ],
        experience: [   
            {
                experience_company:"ABC Corp",
                experience_location:"Bangalore", 
                experience_year:"2022 - Present", 
                experience_designation:"Software Developer", 
                experience_team:"Cloud Deployment", 
                experience_roles: [
                    "Developed and maintained the company website","Developed and maintained the company website"
                    ],
            },
            {
                experience_company:"ABCD Corp",
                experience_location:"Hyderabad", 
                experience_year:"2023 - Present", 
                experience_designation:"Software Developer", 
                experience_description: "I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies.I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies."
            },
        ],
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
