import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const PAGE_SIZE = 50;

const User = ({ setLogoutClicked, setLogoutUserType }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [userRegNo, setUserRegNo] = useState("");
  const [userDept, setUserDept] = useState("");
  const [userCourseType, setUserCourseType] = useState("");
  const [userProgramme, setUserProgramme] = useState("");
  const [userBranch, setUserBranch] = useState("");
  const [accountCreated, setAccountCreated] = useState("");

  const [requestType, setRequestType] = useState("");

  const [mainContent, setMainContent] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  const [logsData, setLogsData] = useState({
    DateNewest: [],
    DateOldest: [],
  });
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [visibleLogsStart, setVisibleLogsStart] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [logTypeRequested, setLogTypeRequested] = useState("");
  const [sortBy, setSortBy] = useState("DateNewest");

  const [showFilters, setShowFilters] = useState(false);

  const [createdByFilter, setCreatedByFilter] = useState("");
  const [logFilter, setLogFilter] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/userDetails/getUserDetails",
          { requestType },
          { withCredentials: true }
        );
        setUserEmail(response.data.Email);
        setUserRegNo(response.data.RegNo);
        setUserDept(response.data.Dept);
        setUserCourseType(response.data.Course);
        setUserProgramme(response.data.Programme);
        setUserBranch(response.data.Branch);
        setAccountCreated(response.data.Created);
        setServerMessage("Successfully fetched user's details");
        setServerMsgType("success");
        setShowServerMsg(true);
        setLoading(false);
      } catch (error) {
        setServerMessage(
          error.response?.data?.message || "Failed to fetch user's details"
        );
        setServerMsgType("error");
        setShowServerMsg(true);
      }
    };
    fetchUserDetails();
  }, [location.pathname]);

  const generateOtp = async (otpReason) => {
    setRequestType(otpReason);
    if (otpReason === "PasswordReset") {
      if (newPassword != confirmPassword) {
        setServerMessage("Passwords doesn't match");
        setServerMsgType("error");
        setShowServerMsg(true);
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/approvals/getApprovalOtp",
        { requestType: otpReason, newPassword },
        { withCredentials: true }
      );
      setMainContent("ShowOtp");
      setOtpInput("");
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

  const resetPassword = async () => {
    if (newPassword != confirmPassword) {
      setServerMessage("Passwords doesn't match");
      setServerMsgType("error");
      setShowServerMsg(true);
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/user/passwordAction/resetPassword",
        { userEmail, newPassword, otpInput },
        { withCredentials: true }
      );
      setServerMessage("Password reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);
      setTimeout(() => {
        navigate("/");
      }, 1000); //Redirect to login page after 1 seconds of showing success message
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Password reset failed"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const resetEncryptionKey = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/user/encryptionKey/resetEncKey",
        { userEmail, otpInput },
        { withCredentials: true }
      );
      setMainContent("");
      setServerMessage("Encryption Key reset successful");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Failed to reset encryption key"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
    }
  };

  const fetchLogs = async () => {
    let isMounted = true;
    setLoading(true);
    setVisibleLogs([]);
    setVisibleLogsStart(0);
    setCreatedByFilter("");
    setLogFilter("");

    try {
      const response = await axios.post(
        "http://localhost:5000/user/logAction/getLogs",
        { otpInput },
        { withCredentials: true }
      );
      if (!isMounted) return;
      const {
        timeSortedNewest = [],
        timeSortedOldest = [],
        totalRecords = 0,
      } = response.data;

      setLogsData({
        DateNewest: timeSortedNewest,
        DateOldest: timeSortedOldest,
      });
      setTotalRecords(totalRecords);
      setVisibleLogsStart(0);
      setLoading(false);
      setMainContent("ShowLogs");
      setServerMessage("Fetched logs successfully");
      setServerMsgType("success");
      setShowServerMsg(true);
    } catch (error) {
      if (!isMounted) return;
      setLogsData({
        DateNewest: [],
        DateOldest: [],
      });
      setTotalRecords(0);
      setVisibleLogs([]);
      setServerMessage(error.response?.data?.message || "Failed to fetch logs");
      setServerMsgType("error");
      setShowServerMsg(true);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  const applyFilterAndSort = () => {
    let selectedLogs = logsData[sortBy] || [];

    if (createdByFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logAddedBy.toLowerCase().includes(createdByFilter.toLowerCase())
      );
    }

    if (logFilter.trim() !== "") {
      selectedLogs = selectedLogs.filter((log) =>
        log.logDetails.toLowerCase().includes(logFilter.toLowerCase())
      );
    }

    setVisibleLogs(
      selectedLogs.slice(visibleLogsStart, visibleLogsStart + PAGE_SIZE)
    );
    setTotalRecords(selectedLogs.length);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [logsData, sortBy, visibleLogsStart]);

  const handlePrev = () =>
    setVisibleLogsStart((start) => Math.max(0, start - PAGE_SIZE));

  const handleNext = () =>
    setVisibleLogsStart((start) =>
      Math.min(start + PAGE_SIZE, Math.max(0, totalRecords - PAGE_SIZE))
    );

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const implementUserAction = () => {
    if (requestType === "GetLogs") {
      fetchLogs();
    }
    if (requestType === "PasswordReset") {
      resetPassword();
    }
    if (requestType === "EncryptionKeyReset") {
      resetEncryptionKey();
    }
  };

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
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
      <div className="UserProfile">
        <div className="UserProfileWrapper">
          <div className="UserProfileInnerWrapper">
            {loading && <span>Loading content....</span>}
            {!loading && (
              <>
                <div className="UserProfileHeader">
                  <p
                    className="AdminDashboardLink"
                    onClick={() => navigate(-1)}
                  >
                    <svg
                      className="MenuIconsSvg"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e3e3e3"
                    >
                      <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
                    </svg>
                    Resume Builder
                  </p>
                  <h3 style={{ color: "red" }}>User Profile</h3>
                  <svg
                    className="MenuIconsSvg"
                    onClick={logoutUser}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                </div>
                <div className="UserProfileBody">
                  <div className="UserDetailsWrapper">
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">Email</span>
                      <span className="UserDetailsValue">{userEmail}</span>
                    </div>
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">
                        Register Number
                      </span>
                      <span className="UserDetailsValue">{userRegNo}</span>
                    </div>
                  </div>
                  <div className="UserDetailsWrapper">
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">Department</span>
                      <span className="UserDetailsValue">{userDept}</span>
                    </div>
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">Course Type</span>
                      <span className="UserDetailsValue">{userCourseType}</span>
                    </div>
                  </div>
                  <div className="UserDetailsWrapper">
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">Programme</span>
                      <span className="UserDetailsValue">{userProgramme}</span>
                    </div>
                    <div className="UserProfileDetails">
                      <span className="UserDetailsHeading">Branch</span>
                      <span className="UserDetailsValue">{userBranch}</span>
                    </div>
                  </div>
                  <div className="UserProfileDetails">
                    <span className="UserDetailsHeading">Account Created</span>
                    <span className="UserDetailsValue">{accountCreated}</span>
                  </div>
                  <div className="UserProfileButtons">
                    <button
                      onClick={() => generateOtp("GetLogs")}
                      className="AddInputButtons"
                    >
                      Show Logs
                    </button>
                    <button
                      onClick={() => setMainContent("DisclaimerPassword")}
                      className="PreviewButton"
                    >
                      Reset Login Password
                    </button>
                    <button
                      onClick={() => setMainContent("DisclaimerEncryption")}
                      className="DownloadButton"
                    >
                      Reset Encryption Key
                    </button>
                  </div>
                </div>
              </>
            )}
            {!loading && mainContent === "DisclaimerPassword" && (
              <div className="UserProfileContent">
                <p>
                  Resetting your password will also remove your previously saved
                  resume details and will close this current active session. You
                  need to login again.
                </p>
                <div className="AuthenticationDivWrapper">
                  <div
                    id="dv-RPPassword"
                    className="AuthenticationInputWrapper"
                  >
                    <input
                      type="password"
                      id="in-rp_password"
                      placeholder=" "
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="in-rp_password"
                      className="AuthenticationTextFieldLabel"
                    >
                      Password
                    </label>
                  </div>
                </div>

                <div className="AuthenticationDivWrapper">
                  <div
                    id="dv-RPConfirmPassword"
                    className="AuthenticationInputWrapper"
                  >
                    <input
                      type="password"
                      id="in-rp_confirmpassword"
                      placeholder=" "
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label
                      htmlFor="in-rp_confirmpassword"
                      className="AuthenticationTextFieldLabel"
                    >
                      Confirm Password
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => generateOtp("PasswordReset")}
                  className="LeftNavigationButtons"
                >
                  Continue
                </button>
              </div>
            )}
            {!loading && mainContent === "DisclaimerEncryption" && (
              <div className="UserProfileContent">
                <p>
                  Resetting your encryption key will also remove your previously
                  saved resume details. You will need to re-enter your resume
                  details for all fields from scratch.
                </p>
                <button
                  onClick={() => generateOtp("EncryptionKeyReset")}
                  className="LeftNavigationButtons"
                >
                  Continue
                </button>
              </div>
            )}
            {!loading && mainContent === "ShowOtp" && (
              <div className="UserProfileContent">
                <div className="UserProfileContentOtp">
                  <input
                    type="text"
                    placeholder=" "
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    required
                  />
                  <label className="UserOtpLabel">Otp</label>
                </div>
                <button
                  onClick={implementUserAction}
                  disabled={!otpInput}
                  className="AddInputButtons"
                >
                  Verify Otp
                </button>
              </div>
            )}

            {!loading && mainContent === "ShowLogs" && (
              <>
                <div className="LogDisplayWrapper">
                  <div className="AdminsListHeading">
                    <p className="AdminTableHeading">User's Logs</p>
                    <span>
                      Total records currently:{" "}
                      <span style={{ color: "red" }}>{totalRecords}</span>
                    </span>
                  </div>

                  <div className="LogListSort">
                    <div className="RegisterDropDown">
                      <select
                        value={sortBy}
                        id="se-sortBy"
                        onChange={(e) => {
                          setSortBy(e.target.value);
                          setVisibleLogsStart(0);
                        }}
                      >
                        <option value="DateNewest">Date: Newest First</option>
                        <option value="DateOldest">Date: Oldest First</option>
                      </select>
                      <label htmlFor="se-sortBy" className="DropDownLabel">
                        Sort By
                      </label>
                    </div>
                  </div>

                  <div className="LogListFilter">
                    <span onClick={toggleFilters}>
                      Click to show/hide available filters
                    </span>
                  </div>

                  {showFilters && (
                    <>
                      {" "}
                      <div className="LogFilterWrapper">
                        <div className="AdminMgmtOtp">
                          <input
                            type="text"
                            placeholder=" "
                            value={createdByFilter}
                            onChange={(e) => setCreatedByFilter(e.target.value)}
                          />
                          <label className="AdminMgmtTextFieldLabel2">
                            Created By
                          </label>
                        </div>
                        <div className="AdminMgmtOtp">
                          <input
                            type="text"
                            placeholder=" "
                            value={logFilter}
                            onChange={(e) => setLogFilter(e.target.value)}
                          />
                          <label className="AdminMgmtTextFieldLabel2">
                            Log
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={applyFilterAndSort}
                        className="AddInputButtons"
                      >
                        Filter
                      </button>
                    </>
                  )}
                </div>
                {!loading && !visibleLogs.length && logTypeRequested && (
                  <span style={{ margin: "2rem 0rem" }}>
                    No logs found for this selection.
                  </span>
                )}

                {!loading && visibleLogs.length > 0 && (
                  <div className="LogDisplayWrapper">
                    <div className="AdminsList">
                      <table className="CurrentAdminsTable">
                        <thead>
                          <tr>
                            <th>Linked Account</th>
                            <th>Created By</th>
                            <th>Created At</th>
                            <th>Log</th>
                          </tr>
                        </thead>
                        <tbody>
                          {visibleLogs.map((log) => (
                            <tr key={`${log.createdAt}-${log.logDetails}`}>
                              <td>{log.logLinkedAccount}</td>
                              <td>{log.logAddedBy}</td>
                              <td>{log.createdAtFormatted}</td>
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
                        Showing {totalRecords === 0 ? 0 : visibleLogsStart + 1}{" "}
                        - {Math.min(visibleLogsStart + PAGE_SIZE, totalRecords)}{" "}
                        out of {totalRecords} records.
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
