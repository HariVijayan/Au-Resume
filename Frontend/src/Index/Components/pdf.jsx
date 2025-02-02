import React, { useState } from 'react';
import axios from 'axios';

const GeneratePDF = () => {
    const [resumeData, setResumeData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+123456789",
        education: [
            { degree: "B.Sc. in Computer Science", institution: "XYZ University", year: "2018 - 2022" },
            { degree: "High School Diploma", institution: "ABC High School", year: "2014 - 2018" }
        ],
        experience: [
            { role: "Software Developer", company: "ABC Corp", years: "2022 - Present" },
            { role: "Intern", company: "Tech Solutions", years: "2021 - 2022" }
        ],
        username: "Hari Prasad V",
        small_bio: "Developer|Designer|Freelancer",
        phone_number: "+91 9090909099",
        emailid: "hari@gmail.com",
        linkedin: "www.linkedin.com/Hari",
        linkedinlink: "https://www.linkedin.com/Hari",
        github: "www.github.com/Hari",
        githublink: "https://www.github.com/Hari",
        summary:"I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies.I am a full stack developer with 3 years of experience in web development. I have worked on multiple projects and have a good understanding of web technologies.",
        phd: [{phd_name: "M.Tech in Computer Science",phd_university: "XYZ University",phd_year: "2022 - 2024",phd_exp: "CGPA : 9.5"},{phd_name: "M.Tech in Computer Science",phd_university: "XYZ University",phd_year: "2022 - 2024",phd_exp: "CGPA : 9.5"}],
        pg_degree: [{pg_degree_name: "M.Tech in Computer Science",pg_degree_university: "XYZ University",pg_degree_year: "2022 - 2024",pg_degree_cgpa: "CGPA : 9.5"},{pg_degree_name: "M.Tech in Computer Science",pg_degree_university: "XYZ University",pg_degree_year: "2022 - 2024",pg_degree_cgpa: "CGPA : 9.5"}],
        ug_degree: [{ug_degree_name: "M.Tech in Computer Science",ug_degree_university: "XYZ University",ug_degree_year: "2022 - 2024",ug_degree_cgpa: "CGPA : 9.5"},{ug_degree_name: "M.Tech in Computer Science",ug_degree_university: "XYZ University",ug_degree_year: "2022 - 2024",ug_degree_cgpa: "CGPA : 9.5"}],
        diploma: [{diploma_name: "M.Tech in Computer Science",diploma_university: "XYZ University",diploma_year: "2022 - 2024",diploma_cgpa: "CGPA : 9.5"},{diploma_name: "M.Tech in Computer Science",diploma_university: "XYZ University",diploma_year: "2022 - 2024",diploma_cgpa: "CGPA : 9.5"}],
        hsc_name:"Jawahar Matric", 
        hsc_year:"2017 - 2019", 
        hsc_grade: "Grade : 68.0",
        sslc_name:"Jawahar Matric", 
        sslc_year:"2017 - 2019", 
        sslc_grade: "Grade : 68.0"
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
