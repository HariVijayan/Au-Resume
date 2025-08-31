import { use, useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const PAGE_SIZE = 50;

const LogActions = () => {
  const [loadingAnim, setLoadingAnim] = useState(false);

  const theme = useTheme();
  const [logActionType, setLogActionType] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);
  const [showLogs, setShowLogs] = useState(false);
  const [totalLogs, setTotalLogs] = useState([]);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [visibleLogsStart, setVisibleLogsStart] = useState(0);

  const [showOtp, setShowOtp] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const getLogDetails = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/logDetails/getLogDetails",
        { collectionName, startDate, endDate },
        { withCredentials: true }
      );
      setTotalLogs(response.data.logs);
      setTotalRecords(response.data.toBeAffectedLogs);
      setVisibleLogs(response.data.logs.slice(0, PAGE_SIZE));
      setVisibleLogsStart(0);
      setLoadingAnim(false);
      setServerMessage("Logs fetched successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(error.response?.data?.message || "Error fetching logs");
      setServerMsgType("error");
      setShowServerMsg(true);
      setVisibleLogs([]);
      setTotalRecords(0);
      setVisibleLogsStart(0);
    }
  };

  const requestType = "logActions";

  const getVerificationOtp = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      setShowOtp(true);
      setLoadingAnim(false);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const deleteLogs = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/deleteRequest/deleteLogs",
        { otpInput, collectionName, startDate, endDate },
        { withCredentials: true }
      );
      setLoadingAnim(false);
      setServerMessage(
        "Log deletion successful. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        `${error.response?.data?.message}. Refreshing the page in 5 seconds` ||
          "Failed to remove logs. Refreshing the page in 5 seconds"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  const downloadLogs = async () => {
    setLoadingAnim(true);
    setServerMessage("Processing your request...");
    setServerMsgType("info");
    setShowServerMsg(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/downloadRequest/downloadLogs",
        { otpInput, collectionName, startDate, endDate },
        { withCredentials: true }
      );

      const blob = new Blob([response.data], {
        type: "text/csv",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${collectionName} - ${startDate} to ${endDate}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      setLoadingAnim(false);
      setServerMessage(
        "Log downloaded successfully. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setLoadingAnim(false);
      setServerMessage(
        `${error.response?.data?.message}. Refreshing the page in 5 seconds` ||
          "Failed to download logs. Refreshing the page in 5 seconds"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  const implementLogAction = async () => {
    if (logActionType === "Delete") {
      deleteLogs();
    }
    if (logActionType === "Download") {
      downloadLogs();
    }
  };

  useEffect(() => {
    if (startDate != "" && endDate != "" && collectionName && logActionType) {
      getLogDetails();
    }
  }, [startDate, endDate]);

  const handlePrev = () => {
    const newStart = Math.max(0, visibleLogsStart - PAGE_SIZE);
    setVisibleLogsStart(newStart);
    setVisibleLogs(totalLogs.slice(newStart, newStart + PAGE_SIZE));
  };

  const handleNext = () => {
    const newStart = Math.min(
      visibleLogsStart + PAGE_SIZE,
      Math.max(0, totalRecords - PAGE_SIZE)
    );
    setVisibleLogsStart(newStart);
    setVisibleLogs(totalLogs.slice(newStart, newStart + PAGE_SIZE));
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

      <Box
        id="AdminActionsWrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          margin: "2rem 0rem",
        }}
      >
        <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
          Log Actions
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          (Choose the respective buttons given below to perform either delete
          logs or download logs on the log collections.)
        </Typography>

        <Box
          id="LogActionType"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            margin: "2rem 0rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setLogActionType("Delete")}
            size="large"
            endIcon={<DeleteIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.brown.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Delete Logs
          </Button>
          <Button
            variant="contained"
            onClick={() => setLogActionType("Download")}
            size="large"
            endIcon={<FileDownloadIcon />}
            sx={{
              margin: "2rem 0rem",
              textTransform: "none",
              backgroundColor: `${theme.palette.black.main}`,
            }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            Download Logs
          </Button>
        </Box>

        {logActionType && (
          <>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Choose one of the log collection given below to perform the action
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "0rem 2rem",
                alignItems: "center",
                width: "100%",
                margin: "2rem 0rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setCollectionName("Admin Logs")}
                size="large"
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Admin Logs
              </Button>
              <Button
                variant="contained"
                onClick={() => setCollectionName("Admin Error Logs")}
                size="large"
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Admin Error Logs
              </Button>
              <Button
                variant="contained"
                onClick={() => setCollectionName("User Logs")}
                size="large"
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                User Logs
              </Button>
              <Button
                variant="contained"
                onClick={() => setCollectionName("User Error Logs")}
                size="large"
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                User Error Logs
              </Button>
            </Box>
          </>
        )}

        {collectionName && (
          <>
            <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
              Choose the start date and end date for the logs which the actions
              need to be performed
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                margin: "2rem 0rem",
                flexWrap: "wrap",
                gap: "0rem 2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width={{ xs: "100%", md: "40%" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month", "day"]}
                    label="Start Date"
                    value={startDate}
                    onChange={(e) => setStartDate(e)}
                    sx={{ margin: "2rem 0rem", width: "80%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </LocalizationProvider>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                width={{ xs: "100%", md: "40%" }}
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={["year", "month", "day"]}
                    label="Ending Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e)}
                    sx={{ margin: "2rem 0rem", width: "80%" }}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </LocalizationProvider>
              </Box>
            </Box>
          </>
        )}

        {totalRecords != null && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: theme.palette.error.main }}>
                {totalRecords} logs
              </Typography>
              <Typography sx={{ marginLeft: "0.5rem" }}>
                {" "}
                will be affected by this action.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              onClick={() => setShowLogs((show) => !show)}
              size="large"
              endIcon={showLogs ? <VisibilityOff /> : <Visibility />}
              sx={{
                margin: "2rem 0rem",
                textTransform: "none",
              }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              {showLogs ? "Hide Logs" : "Show Logs"}
            </Button>
          </>
        )}

        {showLogs && (
          <>
            <TableContainer
              component={Paper}
              sx={{ width: "100%", overflowX: "auto" }}
            >
              <Table
                stickyHeader
                sx={{ minWidth: 650 }}
                aria-label="logs table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontWeight: "bold",
                      }}
                    >
                      Linked Account
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontWeight: "bold",
                      }}
                    >
                      Created By
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontWeight: "bold",
                      }}
                    >
                      Created At
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontWeight: "bold",
                      }}
                    >
                      Priority
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        border: `1px solid ${theme.palette.primary.main}`,
                        fontWeight: "bold",
                      }}
                    >
                      Log
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {visibleLogs.map((log) => (
                    <TableRow key={`${log.createdAt}-${log.logDetails}`} hover>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {log.logLinkedAccount}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {log.logAddedBy}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {log.createdAtFormatted}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {log.logPriority}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          border: `1px solid ${theme.palette.primary.main}`,
                        }}
                      >
                        {log.logDetails}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                width: "100%",
                margin: "2rem 0rem",
                flexWrap: "wrap",
              }}
              justifyContent={{ xs: "center", sm: "space-between" }}
            >
              <IconButton
                aria-label="previous logs"
                sx={{ color: theme.palette.black.main }}
                onClick={handlePrev}
                disabled={visibleLogsStart === 0}
              >
                <KeyboardDoubleArrowLeftIcon />
              </IconButton>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography>
                  {totalRecords === 0 ? 0 : visibleLogsStart + 1} -{" "}
                  {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)} of
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "red", marginLeft: "0.5rem" }}>
                    {totalRecords}
                  </Typography>

                  <Typography sx={{ marginLeft: "0.5rem" }}>
                    records.
                  </Typography>
                </Box>
              </Box>

              <IconButton
                aria-label="next logs"
                sx={{ color: theme.palette.black.main }}
                onClick={handleNext}
                disabled={
                  visibleLogsStart + PAGE_SIZE >= totalRecords ||
                  totalRecords === 0
                }
              >
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
            </Box>
          </>
        )}

        {logActionType &&
          collectionName &&
          startDate &&
          endDate &&
          totalRecords != null &&
          totalRecords > 0 && (
            <Button
              variant="contained"
              color="secondary"
              onClick={getVerificationOtp}
              size="large"
              endIcon={<CheckIcon />}
              sx={{
                margin: "2rem 0rem",
                textTransform: "none",
              }}
              padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
            >
              Proceed
            </Button>
          )}

        {showOtp && (
          <Box
            id="OtpWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "2rem 0rem",
              flexDirection: "column",
            }}
          >
            <Box
              id="OtpInput"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              width={{ xs: "100%", md: "50%" }}
            >
              <TextField
                sx={{ width: "80%", margin: "2rem 0rem" }}
                required
                id="inp-otp"
                label="Otp"
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
              />
            </Box>
            <Box
              id="SubmitButton"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                color="success"
                disabled={!otpInput}
                onClick={implementLogAction}
                size="large"
                endIcon={<DoneAllIcon />}
                loading={loadingAnim}
                loadingPosition="end"
                sx={{ margin: "2rem 0rem", textTransform: "none" }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                {logActionType} {collectionName}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default LogActions;
