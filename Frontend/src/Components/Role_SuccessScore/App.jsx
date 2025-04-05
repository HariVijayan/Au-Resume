import React, { useState } from "react";
import axios from "axios";

function clickFileInput() {
  let fileInput = document.getElementById("in-rolessfile");
  fileInput.click();
}

function App() {
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [error, setError] = useState("");

  const [resumeInput, setResumeInput] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const [successScore, setSuccessScore] = useState("");

  const setNewResumePdf = (event) => {
    setResumeInput(event.target.files[0]);
    displayFileName();
  };

  const displayFileName = () => {
    let fileInput = document.getElementById("in-rolessfile");
    let filename = fileInput.files[0].name;
    setResumeName(filename);
    let fileInputHeader = document.getElementById("sp-ResumeNameHeader");
    fileInputHeader.style.display = "block";
  };

  const getSuccessScore = async () => {
    if (!resumeInput) {
      setError("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", resumeInput);
    formData.append("job_role", jobRole);

    try {
      const response = await axios.post(
        "http://localhost:6969/getMatchScoreRole/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessScore(response.data.success_score);
      setError("");
    } catch (error) {
      setSuccessScore("");
      setError("Error uploading file");
    }
  };

  return (
    <div id="dv-RoleSSWrapper">
      <h1>Role based success score for your resume</h1>

      <div id="dv-RoleSSInputWrapper">
        <div id="dv-RoleInputWrapper" className="dropdown-container">
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            id="dropdown"
            required
          >
            <option value="AI Engineer">AI Engineer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Blockchain Developer">Blockchain Developer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="Data Analyst">Data Analyst</option>
            <option value="Data Architect">Data Architect</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Database Administrator">
              Database Administrator
            </option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Game Developer">Game Developer</option>
            <option value="IOT Engineer">IOT Engineer</option>
            <option value="IT Support Specialist">IT Support Specialist</option>
            <option value="Machine Learning Engineer">
              Machine Learning Engineer
            </option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="Network Administrator">Network Administrator</option>
            <option value="Product Manager (IT)">Product Manager (IT)</option>
            <option value="Robotics Engineer">Robotics Engineer</option>
            <option value="Security Engineer">Security Engineer</option>
            <option value="SEO Specialist">SEO Specialist</option>
            <option value="Software Architect">Software Architect</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Software QA Engineer">Software QA Engineer</option>
            <option value="System Administrator">System Administrator</option>
            <option value="Virtual Reality Developer">
              Virtual Reality Developer
            </option>
            <option value="Web Developer">Web Developer</option>
          </select>
          <label htmlFor="dropdown" className="DropDownLabel">
            Job Role
          </label>
        </div>
      </div>

      <div id="dv-RoleSSResumeInputWrapper">
        <input
          type="file"
          id="in-rolessfile"
          accept=".pdf"
          onChange={setNewResumePdf}
        />
        <button
          id="bt-ResumeInput"
          onClick={clickFileInput}
          className="AddInputButtons"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
          </svg>{" "}
          Upload Resume
        </button>

        <button
          onClick={getSuccessScore}
          id="bt-SuccessScore"
          className="SubmitButton"
        >
          Submit{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </button>
      </div>

      <div id="dv-RoleSSResumeNameWrapper">
        <span id="sp-ResumeNameHeader">Uploaded File Name: </span>
        <span id="sp-ResumeName" style={{ color: "#377dff" }}>
          {resumeName}
        </span>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div id="dv-RoleSSResultWrapper">
        {successScore && (
          <p>
            Based on the historical data, your Resume seems to be having{" "}
            <span style={{ color: "red" }}>{successScore}</span> for this job
            role.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
