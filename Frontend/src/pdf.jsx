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
