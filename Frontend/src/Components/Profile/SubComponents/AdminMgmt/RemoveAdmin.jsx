import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const RemoveAdmin = () => {
  const navigate = useNavigate();
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [remAdminEmail, setRemAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [showApproval, setShowApproval] = useState(null);

  const [showRemAdminOtp, setShowRemAdminOtp] = useState(null);

  const requestType = "removeAdmin";

  const [serverMessage, setServerMessage] = useState("");
  const [showServerMsg, setShowServerMsg] = useState(false);
  const [serverMsgType, setServerMsgType] = useState("error");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/superAdmin/fetchAdmin/adminListGrouped",
          {},
          { withCredentials: true }
        );
        setAdminUsers(response.data.userList);
        setAdminNum(response.data.numAdmins);
        setServerMessage("Successfully fetched current admins list");
        setServerMsgType("success");
        setShowServerMsg(true);
      } catch (error) {
        setServerMessage(
          error.response?.data?.message || "Failed to fetch current admins list"
        );
        setServerMsgType("error");
        setShowServerMsg(true);
      }
    };
    fetchAdmins();
  }, [location.pathname]);

  const getVerificationOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      setShowRemAdminOtp(true);
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

  const removeAdminFromDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/superAdmin/actions/existingAdmin/removeAdmin",
        { remAdminEmail, adminType, otpInput },
        { withCredentials: true }
      );

      setServerMessage(
        "Admin removal successful. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setServerMessage(
        `${error.response?.data?.message}. Refreshing the page in 5 seconds` ||
          "Failed to remove admin. Refreshing the page in 5 seconds"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  useEffect(() => {
    if (remAdminEmail && adminType) {
      setShowApproval(true);
    } else {
      setShowApproval(false);
    }
  }, [adminType, remAdminEmail]);

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
        <p className="AdminMgmtActionHeading">Remove Existing Admins</p>
        <span>
          (Scroll down to see the list of current admins to remove one)
        </span>
        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            <div className="AdminMgmtInputWrapper">
              <input
                type="email"
                placeholder=" "
                value={remAdminEmail}
                onChange={(e) => setRemAdminEmail(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel3">Email</label>
            </div>

            <div className="AdminMgmtInputWrapper">
              <div className="AdminMgmtDropDown">
                <select
                  value={adminType}
                  id="se-adminType"
                  onChange={(e) => setAdminType(e.target.value)}
                >
                  <option value="">Choose AdminType</option>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Analytics">Analytics</option>
                </select>
                <label htmlFor="se-adminType" className="DropDownLabel">
                  Admin Type
                </label>
              </div>
            </div>
          </div>

          {showApproval && (
            <div className="AdminMgmtApprovalWrapper">
              <div className="AdminMgmtApproval">
                <input
                  type="checkbox"
                  checked={approval}
                  onChange={(e) => setApproval(e.target.checked)}
                />
                <span>
                  I affirm and authorize the above mentioned person to be
                  removed as an admin from this site.
                </span>
              </div>
              <button
                style={{ marginTop: "2rem" }}
                onClick={getVerificationOtp}
                disabled={!approval || !remAdminEmail || !adminType}
                className="PreviewButton"
              >
                Approve
              </button>
            </div>
          )}

          {showRemAdminOtp && (
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
                onClick={removeAdminFromDB}
                disabled={!otpInput}
                className="AddInputButtons"
              >
                Remove Admin
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ListAdminsWrapper">
        <div className="AdminsListHeading">
          <p className="AdminTableHeading">Current Admins List</p>
          <span>
            Total number of admins currently:{" "}
            <span style={{ color: "red" }}>{numAdmins}</span>
          </span>
        </div>
        <div className="AdminsList">
          <table className="CurrentAdminsTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin Type</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Failed Logins</th>
                <th>Locked Until</th>
              </tr>
            </thead>
            <tbody>
              {adminUsers.map((admin, index) => (
                <tr key={index}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>{admin.accountType}</td>
                  <td>{admin.createdAtFormatted}</td>
                  <td>{admin.createdBy}</td>
                  <td>{admin.failedLoginAttempts}</td>
                  <td>{admin.lockUntilFormatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RemoveAdmin;
