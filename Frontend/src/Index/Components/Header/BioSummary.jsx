import React from "react";

const BioSummary = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <h1>Resume Form</h1>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={resumeData.username}
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
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
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter custom link URL"
          required
        />
      </div>
      <div>
        <label>Summary:</label>
        <textarea
          name="summary"
          value={resumeData.summary}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your summary"
          required
        />
      </div>
    </div>
  );
};

export default BioSummary;
