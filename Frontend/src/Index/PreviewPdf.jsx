import React from "react";

const PreviewPdf = ({pdfUrl}) => {

  return (
    <>
      <div id="dv-PreviewWrapper">
       <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        title="PDF Viewer"
      ></iframe>
      </div>
    </>
  );
};

export default PreviewPdf;
