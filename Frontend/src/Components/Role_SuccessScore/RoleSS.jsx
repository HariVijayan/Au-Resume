import { useState } from "react";
import axios from "axios";

function clickFileInput() {
  let fileInput = document.getElementById("in-rolessfile");
  fileInput.click();
}

function RoleSS() {
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [error, setError] = useState("");

  const [resumeInput, setResumeInput] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const [successScore, setSuccessScore] = useState("");
  const [jobFitScore, setJobFitScore] = useState("");

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
        "http://localhost:9000/getMatchScoreRole/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessScore(response.data.success_score);
      setJobFitScore(response.data.job_fit_score);
      setError("");
    } catch (error) {
      setSuccessScore("");
      setJobFitScore("");
      setError(error.response.data.message || "Error uploading file");
    }
  };

  return (
    <div id="dv-RoleSSWrapper">
      <div id="dv-RoleSSHeader" className="PageDetailsHeader">
        <span className="RoleSSHeaderText">
          <span id="sp-rolessheading">Role Fit Check</span>
          <svg
            className="RoleSSHeaderSvg"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M852-212 732-332l56-56 120 120-56 56ZM708-692l-56-56 120-120 56 56-120 120Zm-456 0L132-812l56-56 120 120-56 56ZM108-212l-56-56 120-120 56 56-120 120Zm246-75 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-361Z" />
          </svg>
        </span>
      </div>
      <h4>
        Check job fit score by analysing how well your resume performs against
        the role's historical requirements.
      </h4>

      <div id="dv-RoleSSInputWrapper">
        <div id="dv-RoleInputWrapper" className="dropdown-container">
          <select
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            id="dropdown"
            required
          >
            <option value="Backend Developer">Backend Developer</option>
            <option value="Cloud Engineer">Cloud Engineer</option>
            <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Software Engineer">Software Engineer</option>
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
          className="DownloadButton"
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
        {successScore && jobFitScore && (
          <p>
            Based on the historical data, your Resume seems to be having{" "}
            <span style={{ color: "red" }}>{successScore}</span> for this job
            role based on ML Classification model and a success score of{" "}
            <span style={{ color: "red" }}>{jobFitScore}</span> based on ML
            Regression model.
          </p>
        )}
      </div>
    </div>
  );
}

export default RoleSS;
