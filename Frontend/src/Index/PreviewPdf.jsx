import React, { useState } from "react";
import axios from "axios";

const PreviewPdf = ({ resumeData }) => {
  const [pdfUrl, setPdfUrl] = useState('');
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);  

  const fetchPdf = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-pdf",
        resumeData,
        {
          responseType: "arraybuffer",
        }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      setIsPreviewClicked(true);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <>
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
          Preview
        </button>
      </div>
    </>
  );
};

export default PreviewPdf;
