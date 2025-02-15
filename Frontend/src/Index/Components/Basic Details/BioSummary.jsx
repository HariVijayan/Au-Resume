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
    <div id="dv-BasicDetailsWrapper" className="WrapperClass">
      <div id="dv-BasicDetailsHeader" className="BasicDetailsHeader">
      <h3>Basic Details</h3>
      </div>
      <div id="dv-BasicDetailsUsername" className="InputWrapper">
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
      <div id="dv-BasicDetailsBio" className="InputWrapper">
        <label>Small Bio:</label>
        <input
          type="text"
          name="small_bio"
          value={resumeData.small_bio}
          onChange={(e) => handleInputChange(e)}
          placeholder="Developer | Designer | Freelancer"
        />
      </div>
      <div id="dv-BasicDetailsPhoneNumber" className="InputWrapper">
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
      <div id="dv-BasicDetailsEmail" className="InputWrapper">
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
      <div id="dv-BasicDetailsLocation" className="InputWrapper">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={resumeData.location}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your location"
        />
      </div>
      <div id="dv-BasicDetailsLinkedIn" className="InputWrapper">
        <label>LinkedIn Username:</label>
        <input
          type="text"
          name="linkedin"
          value={resumeData.linkedin}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your LinkedIn username"
        />
      </div>
      <div id="dv-BasicDetailsLinkedInUrl" className="InputWrapper">
        <label>LinkedIn URL:</label>
        <input
          type="url"
          name="linkedinurl"
          value={resumeData.linkedinurl}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your LinkedIn URL"
        />
      </div>
      <div id="dv-BasicDetailsGithub" className="InputWrapper">
        <label>GitHub Username:</label>
        <input
          type="text"
          name="github"
          value={resumeData.github}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your GitHub username"
        />
      </div>
      <div id="dv-BasicDetailsGithubUrl" className="InputWrapper">
        <label>GitHub URL:</label>
        <input
          type="url"
          name="githuburl"
          value={resumeData.githuburl}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter your GitHub URL"
        />
      </div>
      <div id="dv-BasicDetailsCustomLink" className="InputWrapper">
        <label>Custom Link (e.g., Portfolio):</label>
        <input
          type="text"
          name="customlink"
          value={resumeData.customlink}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter custom link"
        />
      </div>
      <div id="dv-BasicDetailsCustomLinkUrl" className="InputWrapper">
        <label>Custom Link URL:</label>
        <input
          type="url"
          name="customlinkurl"
          value={resumeData.customlinkurl}
          onChange={(e) => handleInputChange(e)}
          placeholder="Enter custom link URL"
        />
      </div>
      <div id="dv-BasicDetailsSummary" className="InputWrapper">
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
