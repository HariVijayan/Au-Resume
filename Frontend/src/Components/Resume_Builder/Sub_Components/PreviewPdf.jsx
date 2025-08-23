import { useState } from "react";
import axios from "axios";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PreviewPdf = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isPreviewClicked, setIsPreviewClicked] = useState(false);

  const { resumeData } = ResumeInputTemplate();
  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const pdfAction = async () => {
    if (!isPreviewClicked) {
      await fetchPdf();
      setIsPreviewClicked(true);
    } else {
      setIsPreviewClicked(false);
    }
  };

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

      setServerMessage("Successfully fetched resume for preview");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setIsPreviewClicked(false);
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
      <Stack
        id="RightContent"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "2rem 0rem",
          minHeight: "80vh",
        }}
        width={{ xs: "90%", md: "40%" }}
      >
        {isPreviewClicked && (
          <Box
            component="iframe"
            src={pdfUrl}
            width="100%"
            title="PDF Viewer"
            sx={{ minHeight: "600px" }}
          ></Box>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={pdfAction}
          size="large"
          endIcon={isPreviewClicked ? <Visibility /> : <VisibilityOff />}
          sx={{ margin: "2rem 0rem", textTransform: "none" }}
          padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
        >
          Preview
        </Button>
      </Stack>
    </>
  );
};

export default PreviewPdf;
