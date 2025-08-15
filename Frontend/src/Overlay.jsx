import axios from "axios";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BackupIcon from "@mui/icons-material/Backup";
import ResumeInputTemplate from "./ResumeFormat.jsx";
import { useTheme } from "@mui/material/styles";

const Overlay = ({ overlayTitle, overlayAction, setOverlayType }) => {
  const { resumeData, setResumeData } = ResumeInputTemplate();

  const [userPassword, setUserPassword] = useState("");
  const [loadingAnim, setLoadingAnim] = useState(false);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const theme = useTheme();

  const fetchPreviousResume = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/getPrevious/resume-details",
        { userPassword },
        { withCredentials: true }
      );
      setUserPassword("");
      setLoadingAnim(false);
      setResumeData(response.data);
      setServerMessage("Successfully fetched previous records");
      setServerMsgType("success");
      setShowServerMsg(true);
      setTimeout(() => {
        setOverlayType("");
      }, 2000); //Remove overlay automatically after 2 seconds
    } catch (error) {
      setUserPassword("");
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to fetch previous records"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const saveCurrentResume = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/saveResume/current-resume",
        { userPassword, resumeData },
        { withCredentials: true }
      );
      setUserPassword("");
      setLoadingAnim(false);
      setServerMessage(
        "Successfully saved current details after end to end encryption"
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        setOverlayType("");
      }, 2000); //Remove overlay automatically after 2 seconds
    } catch (error) {
      setUserPassword("");
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to save current details"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
      }}
    >
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
      <Dialog
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          margin: "2rem 0rem",
        }}
        open={true}
        fullWidth={true}
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              height: "70vh",
              display: "flex",
              flexDirection: "column",
            },
          },
        }}
        onClose={() => setOverlayType("")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", margin: "2rem" }}
        >
          <CloseIcon
            onClick={() => setOverlayType("")}
            sx={{
              cursor: "pointer",
              ":hover": { color: theme.palette.error.main },
            }}
          />
        </Box>
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          {overlayTitle}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            width={{ xs: "90%", md: "70%", lg: "50%" }}
          >
            <TextField
              sx={{ width: "80%", margin: "2rem 0rem" }}
              required
              id="inp-Password"
              label="Password"
              type="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Box>
          {overlayAction === "Fetch" && (
            <Button
              variant="contained"
              onClick={fetchPreviousResume}
              disabled={!userPassword}
              size="large"
              endIcon={<CloudDownloadIcon />}
              loading={loadingAnim}
              loadingPosition="end"
              sx={{ margin: "2rem 0rem", textTransform: "none" }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Fetch
            </Button>
          )}

          {overlayAction === "Save" && (
            <Button
              variant="contained"
              onClick={saveCurrentResume}
              disabled={!userPassword}
              size="large"
              endIcon={<BackupIcon />}
              loading={loadingAnim}
              loadingPosition="end"
              sx={{ margin: "2rem 0rem", textTransform: "none" }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Save
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Overlay;
