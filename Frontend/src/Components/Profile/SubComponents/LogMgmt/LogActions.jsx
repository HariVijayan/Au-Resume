import { use, useEffect, useState } from "react";
import axios from "axios";

const LogActions = () => {
  const [logActionType, setLogActionType] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [toBeAffectedLogs, setToBeAffectedLogs] = useState(null);

  const [showOtp, setShowOtp] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");

  const [logActionResult, setLogActionResult] = useState("");
  const [logActionResultColor, setLogActionResultColor] = useState("red");

  const getLogDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/logDetails/getLogDetails",
        { collectionName, startDate, endDate },
        { withCredentials: true }
      );
      setToBeAffectedLogs(response.data.toBeAffectedLogs);
    } catch (error) {}
  };

  const requestType = "logActions";

  const getVerificationOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      if (response.statusText === "OK") {
        setShowOtp(true);
        setOtpReqMessage(
          "An OTP has been sent to your email. Verify to proceed with the request"
        );
        setOtpReqMessageColor("green");
      } else {
        setOtpReqMessageColor("red");
        setOtpReqMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setOtpReqMessageColor("red");
      setOtpReqMessage(
        error.data.message ||
          "Failed to get otp for verification. Refresh the page and try again."
      );
    }
  };

  const implementLogAction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/logMgmt/logAction/implementLogAction",
        { otpInput, collectionName, startDate, endDate, logActionType },
        { withCredentials: true }
      );

      if (response.statusText === "OK") {
        setLogActionResult(
          `Logs have been ${logActionType}ed successfully. Refreshing the page in 5 seconds.`
        );
        setLogActionResultColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      } else {
        setLogActionResultColor("red");
        setLogActionResult(response.data.message);
      }
    } catch (error) {
      setLogActionResultColor("red");
      setLogActionResult(
        `Failed to ${logActionType} logs. Refreshing the page in 5 seconds. Please try again.`
      );
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  useEffect(() => {
    if (startDate != "" && endDate != "" && collectionName && logActionType) {
      getLogDetails();
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Log Actions</p>
        <span>
          (Choose the respective buttons given below to perform either clear
          logs or download logs on the log collections.)
        </span>

        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            {["Clear", "Download"].map((type) => (
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

      {toBeAffectedLogs != null && (
        <span style={{ paddingBottom: "5rem" }}>
          <span style={{ color: "red" }}>{toBeAffectedLogs} logs</span> will be
          affected by this action.
        </span>
      )}

      {logActionType &&
        collectionName &&
        startDate &&
        endDate &&
        toBeAffectedLogs != null &&
        toBeAffectedLogs > 0 && (
          <button className="AddInputButtons" onClick={getVerificationOtp}>
            Proceed
          </button>
        )}

      {otpReqMessage && (
        <p style={{ color: `${otpReqMessageColor}` }}>{otpReqMessage}</p>
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

      {logActionResult && (
        <p style={{ color: `${logActionResultColor}` }}>{logActionResult}</p>
      )}
    </>
  );
};

export default LogActions;
