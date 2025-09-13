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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import SchoolIcon from "@mui/icons-material/School";

const Overlay = ({ overlayTitle, overlayAction, setOverlayType }) => {
  const { resumeData, setResumeData } = ResumeInputTemplate();
  const [downloadType, setDownloadType] = useState("personal");

  const [userPassword, setUserPassword] = useState("");
  const [loadingAnim, setLoadingAnim] = useState(false);

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const showPasswordInput = () => setShowPasswordIcon((show) => !show);

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

  const downloadResume = async () => {
    const formData = {
      resumeData,
      downloadType,
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
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Resume.pdf";
      link.click();
      setServerMessage("Successfully downloaded resume");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to generate resume"
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
            textAlign: "center",
          }}
        >
          {overlayTitle}
        </DialogTitle>

        {overlayAction === "Fetch" ||
          (overlayAction === "Save" && (
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
                  required
                  variant="outlined"
                  label="Password"
                  type={showPasswordIcon ? "text" : "password"}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              showPasswordIcon
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={showPasswordInput}
                          >
                            {showPasswordIcon ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ width: "80%", margin: "2rem 0rem" }}
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
          ))}

        {overlayAction === "Download" && (
          <DialogContent
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                setDownloadType("personal");
                downloadResume();
              }}
              size="large"
              endIcon={<EmojiPeopleIcon />}
              loading={loadingAnim}
              loadingPosition="end"
              sx={{ margin: "2rem 0rem", textTransform: "none" }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Personal Use
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                setDownloadType("campus");
                downloadResume();
              }}
              size="large"
              endIcon={<SchoolIcon />}
              loading={loadingAnim}
              loadingPosition="end"
              sx={{ margin: "2rem 0rem", textTransform: "none" }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Campus Placement
            </Button>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
};

export default Overlay;
