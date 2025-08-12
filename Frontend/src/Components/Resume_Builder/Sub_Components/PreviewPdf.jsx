import { useState } from "react";
import axios from "axios";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PreviewPdf = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);

  const { resumeData } = ResumeInputTemplate();
  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const fetchPdf = async () => {
    const formData = {
      resumeData,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/generate/Resume",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      setIsPreviewClicked(true);

      setServerMessage("Successfully fetched resume to preview");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to fetch resume for preview"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  return (
    <>
      <Snackbar
        open={showServerMsg}
        autoHideDuration={5000}
        onClose={() => setShowServerMsg(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={() => setShowServerMsg(false)}
          severity={serverMsgType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {serverMessage}
        </Alert>
      </Snackbar>
      <div id="dv-PreviewWrapper">
        {isPreviewClicked && (
          <iframe
            src={pdfUrl}
            width="100%"
            title="PDF Viewer"
            height="600px"
          ></iframe>
        )}
        <button type="button" onClick={fetchPdf} className="PreviewButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
          </svg>{" "}
          Preview
        </button>
      </div>
    </>
  );
};

export default PreviewPdf;
