import React, { useState } from 'react';
import axios from 'axios';

const ResumeForm = () => {
  const [resumeData, setResumeData] = useState({
    username: "",
    small_bio: "",
    phone_number: "",
    emailid: "",
    location: "",
    linkedin: "",
    linkedinurl: "",
    github: "",
    githuburl: "",
    customlink: "",
    customlinkurl: "",
    summary: "",
    education: [
      {
        phd: [
          {
            phd_name: "",
            phd_university: "",
            phd_year: "",
            phd_exp: "",
            phd_additional_info: ""
          }
        ],
        pg_degree: [
          {
            pg_degree_name: "",
            pg_degree_university: "",
            pg_degree_year: "",
            pg_degree_cgpa: "",
            pg_degree_additional_info: ""
          }
        ],
      }
    ]
  });

  // Handle input changes for main fields (like username, small_bio, etc.)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData({
      ...resumeData,
      [name]: value
    });
  };

  // Handle input changes for Ph.D. education fields
  const handlePhdInputChange = (e, phdIndex) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd[phdIndex][name] = value; // Update the phd field at the given index

    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  // Handle adding a new Ph.D. education div
  const handleAddPhd = () => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].phd.push({
      phd_name: "",
      phd_university: "",
      phd_year: "",
      phd_exp: "",
      phd_additional_info: ""
    });
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const handlePgInputChange = (e, pgIndex) => {
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree[pgIndex][name] = value; // Update the phd field at the given index

    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  // Handle adding a new Ph.D. education div
  const handleAddPg = () => {
    const updatedEducation = [...resumeData.education];
    updatedEducation[0].pg_degree.push({
      pg_degree_name: "",
      pg_degree_university: "",
      pg_degree_year: "",
      pg_degree_cgpa: "",
      pg_degree_additional_info: ""
    });
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const handleEducationInputChange = (e, Index, educationValue) => {
    console.log("change:", educationValue);
    const { name, value } = e.target;
    const updatedEducation = [...resumeData.education];
    switch(educationValue) {
      case 'phd':
        updatedEducation[0].phd[Index][name] = value;
        break;
      case 'pg_degree':
        updatedEducation[0].pg_degree[Index][name] = value;
        break;
      default:
        console.log("Default"); 
        break;
    }
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  // Handle adding a new Ph.D. education div
  const handleAddEducation = (educationValue, e) => {
    e.preventDefault(); 
    console.log("Add:", educationValue);
    const updatedEducation = [...resumeData.education];
    switch(educationValue) {
      case 'phd':
        updatedEducation[0].phd.push({
          phd_name: "",
          phd_university: "",
          phd_year: "",
          phd_exp: "",
          phd_additional_info: ""
        });
        break;
      case 'pg_degree':
        updatedEducation[0].pg_degree.push({
          pg_degree_name: "",
          pg_degree_university: "",
          pg_degree_year: "",
          pg_degree_cgpa: "",
          pg_degree_additional_info: ""
        });
        break;
      default:
        console.log("Default");   
        break;
      }
    
    setResumeData({
      ...resumeData,
      education: updatedEducation
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="form-container">
      <h1>Resume Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={resumeData.username}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Small Bio:</label>
          <input
            type="text"
            name="small_bio"
            value={resumeData.small_bio}
            onChange={handleInputChange}
            placeholder="Developer | Designer | Freelancer"
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={resumeData.phone_number}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <label>Email ID:</label>
          <input
            type="email"
            name="emailid"
            value={resumeData.emailid}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={resumeData.location}
            onChange={handleInputChange}
            placeholder="Enter your location"
            required
          />
        </div>
        <div>
          <label>LinkedIn Username:</label>
          <input
            type="text"
            name="linkedin"
            value={resumeData.linkedin}
            onChange={handleInputChange}
            placeholder="Enter your LinkedIn username"
            required
          />
        </div>
        <div>
          <label>LinkedIn URL:</label>
          <input
            type="url"
            name="linkedinurl"
            value={resumeData.linkedinurl}
            onChange={handleInputChange}
            placeholder="Enter your LinkedIn URL"
            required
          />
        </div>
        <div>
          <label>GitHub Username:</label>
          <input
            type="text"
            name="github"
            value={resumeData.github}
            onChange={handleInputChange}
            placeholder="Enter your GitHub username"
            required
          />
        </div>
        <div>
          <label>GitHub URL:</label>
          <input
            type="url"
            name="githuburl"
            value={resumeData.githuburl}
            onChange={handleInputChange}
            placeholder="Enter your GitHub URL"
            required
          />
        </div>
        <div>
          <label>Custom Link (e.g., Portfolio):</label>
          <input
            type="text"
            name="customlink"
            value={resumeData.customlink}
            onChange={handleInputChange}
            placeholder="Enter custom link"
            required
          />
        </div>
        <div>
          <label>Custom Link URL:</label>
          <input
            type="url"
            name="customlinkurl"
            value={resumeData.customlinkurl}
            onChange={handleInputChange}
            placeholder="Enter custom link URL"
            required
          />
        </div>
        <div>
          <label>Summary:</label>
          <textarea
            name="summary"
            value={resumeData.summary}
            onChange={handleInputChange}
            placeholder="Enter your summary"
            required
          />
        </div>

        {/* Education Section: Ph.D. Details */}
        <div className="education-section">
          <h3>Education - Ph.D. Details</h3>
          {resumeData.education[0].phd.map((phd, index) => (
            <div key={index} className="phd-entry">
              <div>
                <label>Ph.D. Name:</label>
                <input
                  type="text"
                  name="phd_name"
                  value={phd.phd_name}
                  onChange={(e) => handleEducationInputChange(e, index, 'phd')}
                  placeholder="Ph.D. Name"
                  required
                />
              </div>
              <div>
                <label>Ph.D. University:</label>
                <input
                  type="text"
                  name="phd_university"
                  value={phd.phd_university}
                  onChange={(e) => handleEducationInputChange(e, index, 'phd')}
                  placeholder="University Name"
                  required
                />
              </div>
              <div>
                <label>Ph.D. Year:</label>
                <input
                  type="text"
                  name="phd_year"
                  value={phd.phd_year}
                  onChange={(e) => handleEducationInputChange(e, index, 'phd')}
                  placeholder="Year of Study"
                  required
                />
              </div>
              <div>
                <label>Ph.D. Expertise:</label>
                <input
                  type="text"
                  name="phd_exp"
                  value={phd.phd_exp}
                  onChange={(e) => handleEducationInputChange(e, index, 'phd')}
                  placeholder="Expertise"
                  required
                />
              </div>
              <div>
                <label>Ph.D. Additional Info:</label>
                <textarea
                  name="phd_additional_info"
                  value={phd.phd_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index, 'phd')}
                  placeholder="Additional Info"
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={(e) => handleAddEducation('phd', e)}>Add Phd</button>

          <h3>PG Details</h3>
          {resumeData.education[0].pg_degree.map((pg_degree, index) => (
            <div key={index} className="pg-entry">
              <div>
                <label>PG. Name:</label>
                <input
                  type="text"
                  name="pg_degree_name"
                  value={pg_degree.pg_degree_name}
                  onChange={(e) => handleEducationInputChange(e, index, 'pg_degree')}
                  placeholder="PG Name"
                  required
                />
              </div>
              <div>
                <label>PG University:</label>
                <input
                  type="text"
                  name="pg_degree_university"
                  value={pg_degree.pg_degree_university}
                  onChange={(e) => handleEducationInputChange(e, index, 'pg_degree')}
                  placeholder="University Name"
                  required
                />
              </div>
              <div>
                <label>Pg. Year:</label>
                <input
                  type="text"
                  name="pg_degree_year"
                  value={pg_degree.pg_degree_year}
                  onChange={(e) => handleEducationInputChange(e, index, 'pg_degree')}
                  placeholder="Year of Study"
                  required
                />
              </div>
              <div>
                <label>Pg CGPA:</label>
                <input
                  type="text"
                  name="pg_degree_cgpa"
                  value={pg_degree.pg_degree_cgpa}
                  onChange={(e) => handleEducationInputChange(e, index, 'pg_degree')}
                  placeholder="CGPA"
                  required
                />
              </div>
              <div>
                <label>Pg Additional Info:</label>
                <textarea
                  name="pg_additional_info"
                  value={pg_degree.pg_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index, 'pg_degree')}
                  placeholder="Additional Info"
                  required
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={(e) => handleAddEducation('pg_degree', e)}>Add PG</button>


        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResumeForm;
