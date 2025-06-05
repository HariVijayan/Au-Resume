import { useState } from "react";
import axios from "axios";

function clickFileInput() {
  let fileInput = document.getElementById("in-jdssfile");
  fileInput.click();
}

function JdSS() {
  const [jdInput, setJdInput] = useState("");
  const [similarity, setSimilarity] = useState(null);
  const [error, setError] = useState("");
  const [matchedEntities, setMatchedEntities] = useState(null);
  const [unmatchedEntities, setUnmatchedEntities] = useState(null);

  const setNewJdValue = (event) => {
    setJdInput(event.target.value);
  };

  const [resumeInput, setResumeInput] = useState(null);
  const [resumeName, setResumeName] = useState("");

  const setNewResumePdf = (event) => {
    setResumeInput(event.target.files[0]);
    displayFileName();
  };

  const displayFileName = () => {
    let fileInput = document.getElementById("in-jdssfile");
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
    formData.append("job_description", jdInput);

    try {
      const response = await axios.post(
        "http://localhost:8000/getMatchScore/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSimilarity(response.data.match_score);
      setMatchedEntities(response.data.matched_entities);
      setUnmatchedEntities(response.data.unmatched_entities);
      setError("");
    } catch (error) {
      setSimilarity(null);
      setMatchedEntities(null);
      setUnmatchedEntities(null);
      setError(error.response.data.message || "Error uploading file");
    }
  };

  return (
    <>
      <div id="dv-JdSSWrapper">
        <div id="dv-JdSSHeader" className="PageDetailsHeader">
          <span className="JdSSHeaderText">
            <span id="sp-jdssheading">Jd Success Score</span>
            <svg
              className="JdSSHeaderSvg"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M657-121 544-234l56-56 57 57 127-127 56 56-183 183Zm-537 1v-80h360v80H120Zm0-160v-80h360v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
            </svg>
          </span>
        </div>
        <h4>
          Get a success score by analysing how well your resume performs against
          the provided job description.
        </h4>

        <div id="dv-JdSSInputWrapper">
          <div id="dv-JdSSJdInputWrapper" className="JDSSInputWrapper">
            <textarea
              value={jdInput}
              onChange={setNewJdValue}
              placeholder=" "
              id="tx-Jobdescription"
            />
            <label htmlFor="tx-Jobdescription" className="JDSSTextFieldLabel">
              {" "}
              Job Description{" "}
            </label>
          </div>

          <div id="dv-JdSSResumeInputWrapper">
            <input
              type="file"
              id="in-jdssfile"
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

          <div id="dv-JDSSResumeNameWrapper">
            <span id="sp-ResumeNameHeader">Uploaded File Name: </span>
            <span id="sp-ResumeName" style={{ color: "#377dff" }}>
              {resumeName}
            </span>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {similarity !== null && (
          <div id="dv-JdSSMainSimilarity" style={{ marginTop: "20px" }}>
            <h3>Overall Success Score: {similarity}</h3>
          </div>
        )}

        <div id="dv-JdSSResultsWrapper">
          {matchedEntities && (
            <div id="dv-JdSSMatchedEntitiesWrapper">
              <h2 style={{ textDecoration: "underline" }}>Matched Entities</h2>
              {Object.keys(matchedEntities).map((entity) => (
                <div key={entity}>
                  <p style={{ textDecoration: "underline" }}>
                    <strong>
                      {entity.charAt(0).toUpperCase() + entity.slice(1)}
                    </strong>
                  </p>

                  <p>
                    <strong>Resume Input: </strong>
                    {matchedEntities[entity]?.resume
                      ? Array.isArray(matchedEntities[entity].resume)
                        ? matchedEntities[entity].resume.join(", ")
                        : matchedEntities[entity].resume
                      : "No matching skills"}
                  </p>

                  <p>
                    <strong>JD Input: </strong>
                    {Array.isArray(matchedEntities[entity]?.job_description)
                      ? matchedEntities[entity].job_description.join(", ")
                      : matchedEntities[entity]?.job_description ||
                        "No matching job description found"}
                  </p>

                  <p>
                    <strong>Similarity: </strong>
                    {Array.isArray(matchedEntities[entity]?.similarity)
                      ? matchedEntities[entity].similarity.join(", ")
                      : matchedEntities[entity]?.similarity || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}

          {unmatchedEntities && (
            <div id="dv-JdSSUnmatchedEntitiesWrapper">
              <h2 style={{ textDecoration: "underline" }}>
                Unmatched Entities
              </h2>
              {Object.keys(unmatchedEntities).map((entity) => (
                <div key={entity}>
                  <p style={{ textDecoration: "underline" }}>
                    <strong>
                      {entity.charAt(0).toUpperCase() + entity.slice(1)}
                    </strong>
                  </p>

                  <p>
                    <strong>Resume Input: </strong>
                    {unmatchedEntities[entity]?.resume
                      ? Array.isArray(unmatchedEntities[entity].resume)
                        ? unmatchedEntities[entity].resume.join(", ")
                        : unmatchedEntities[entity].resume
                      : "No matching skills"}
                  </p>

                  <p>
                    <strong>JD Input: </strong>
                    {Array.isArray(unmatchedEntities[entity]?.job_description)
                      ? unmatchedEntities[entity].job_description.join(", ")
                      : unmatchedEntities[entity]?.job_description ||
                        "No matching job description found"}
                  </p>

                  <p>
                    <strong>Similarity: </strong>
                    {Array.isArray(unmatchedEntities[entity]?.similarity)
                      ? unmatchedEntities[entity].similarity.join(", ")
                      : unmatchedEntities[entity]?.similarity || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default JdSS;
