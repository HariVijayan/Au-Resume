import { use, useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PAGE_SIZE = 50;

const LogActions = () => {
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
      setServerMessage("Logs fetched successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
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
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      setShowOtp(true);
      setServerMessage("Otp sent to email successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to generate Otp"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const deleteLogs = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/deleteRequest/deleteLogs",
        { otpInput, collectionName, startDate, endDate },
        { withCredentials: true }
      );

      setServerMessage(
        "Log deletion successful. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
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
      link.download = `${collectionName} ${startDate} to ${endDate}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
      setServerMessage(
        "Log downloaded successfully. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
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
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Log Actions</p>
        <span>
          (Choose the respective buttons given below to perform either delete
          logs or download logs on the log collections.)
        </span>

        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            {["Delete", "Download"].map((type) => (
              <div className="AdminMgmtInputWrapper" key={type}>
                <button
                  onClick={() => setLogActionType(type)}
                  className="AddInputButtons"
                >
                  {type} Logs
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {logActionType && (
        <>
          <span style={{ paddingTop: "5rem" }}>
            Choose one of the log collection given below to perform the action
          </span>
          <div className="AdminConsoleInputsWrapper">
            <div className="AdminMgmtInputWrapper">
              <button
                className="LeftNavigationButtons"
                onClick={() => setCollectionName("Admin Logs")}
              >
                Admin Logs
              </button>
            </div>
            <div className="AdminMgmtInputWrapper">
              <button
                className="LeftNavigationButtons"
                onClick={() => setCollectionName("Admin Error Logs")}
              >
                Admin Error Logs
              </button>
            </div>
            <div className="AdminMgmtInputWrapper">
              <button
                className="LeftNavigationButtons"
                onClick={() => setCollectionName("User Logs")}
              >
                User Logs
              </button>
            </div>
            <div className="AdminMgmtInputWrapper">
              <button
                className="LeftNavigationButtons"
                onClick={() => setCollectionName("User Error Logs")}
              >
                User Error Logs
              </button>
            </div>
          </div>
        </>
      )}

      {collectionName && (
        <>
          <span style={{ paddingTop: "5rem" }}>
            Choose the start date and end date for the logs which the actions
            need to be performed
          </span>
          <div className="LogActionsInputWrapper">
            <div className="LogActionsInput">
              <span style={{ paddingRight: "2rem" }}>Start Month/Year: </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="LogActionsInput">
              <span style={{ paddingRight: "2rem" }}>End Month/Year: </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {totalRecords != null && (
        <span style={{ paddingBottom: "5rem" }}>
          <span style={{ color: "red" }}>{totalRecords} logs</span> will be
          affected by this action.{" "}
          {!showLogs && (
            <span
              style={{ color: "#377dff", cursor: "pointer" }}
              onClick={() => setShowLogs(true)}
            >
              (Show Logs)
            </span>
          )}
          {showLogs && (
            <span
              style={{ color: "#377dff", cursor: "pointer" }}
              onClick={() => setShowLogs(false)}
            >
              (Hide Logs)
            </span>
          )}
        </span>
      )}

      {showLogs && (
        <div className="LogDisplayWrapper">
          <div className="AdminsList">
            <table className="CurrentAdminsTable">
              <thead>
                <tr>
                  <th>Linked Account</th>
                  <th>Created By</th>
                  <th>Created At</th>
                  <th>Priority</th>
                  <th>Log</th>
                </tr>
              </thead>
              <tbody>
                {visibleLogs.map((log) => (
                  <tr key={`${log.createdAt}-${log.logDetails}`}>
                    <td>{log.logLinkedAccount}</td>
                    <td>{log.logAddedBy}</td>
                    <td>{log.createdAtFormatted}</td>
                    <td>{log.logPriority}</td>
                    <td>{log.logDetails}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="LogsNavigation">
            <button
              onClick={handlePrev}
              className="LeftNavigationButtons"
              disabled={visibleLogsStart === 0}
            >
              Previous
            </button>

            <span>
              Showing {totalRecords === 0 ? 0 : visibleLogsStart + 1} -{" "}
              {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)} out of{" "}
              {totalRecords} records.
            </span>

            <button
              onClick={handleNext}
              className="LeftNavigationButtons"
              disabled={
                visibleLogsStart + PAGE_SIZE >= totalRecords ||
                totalRecords === 0
              }
            >
              Next
            </button>
          </div>
        </div>
      )}

      {logActionType &&
        collectionName &&
        startDate &&
        endDate &&
        totalRecords != null &&
        totalRecords > 0 && (
          <button className="AddInputButtons" onClick={getVerificationOtp}>
            Proceed
          </button>
        )}

      {showOtp && (
        <div className="AdminMgmtOtpWrapper">
          <div className="AdminMgmtOtp">
            <input
              type="text"
              placeholder=" "
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              required
            />
            <label className="AdminMgmtTextFieldLabel2">Otp</label>
          </div>
          <button
            disabled={!otpInput}
            className="DownloadButton"
            onClick={implementLogAction}
          >
            {logActionType} {collectionName}
          </button>
        </div>
      )}
    </>
  );
};

export default LogActions;
