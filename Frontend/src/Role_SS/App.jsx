import React, { useState } from "react";
import axios from "axios";

function App() {
  const [document, setDocument] = useState("");

  const handleDocumentChange = (event) => {
    setDocument(event.target.value);
  };
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
    formData.append("job_role", document);

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
        <label>
          <strong>Job Role:</strong>
          <input
            value={document}
            onChange={handleDocumentChange}
            placeholder="Enter Job Role"
          />
        </label>
      </div>

      <div>
        <h1>Upload a PDF</h1>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <a href="index.html">Back</a>
    </>
  );
}

export default App;
