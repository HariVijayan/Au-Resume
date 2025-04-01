import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jobRole, setJobRole] = useState("Software Engineer");

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
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
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  return (
    <>
      <h1>Resume Success Score Profiler</h1>

      <div style={{ marginBottom: "10px" }}>
        <label>Job Role</label>
        <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
          <option value="AI Engineer">AI Engineer</option>
          <option value="Backend Developer">Backend Developer</option>
          <option value="Blockchain Developer">Blockchain Developer</option>
          <option value="Cloud Engineer">Cloud Engineer</option>
          <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Data Architect">Data Architect</option>
          <option value="Data Scientist">Data Scientist</option>
          <option value="Database Administrator">Database Administrator</option>
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
      </div>

      <div>
        <h1>Upload a PDF</h1>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
    </>
  );
}

export default App;
