import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ModifyAdmin = () => {
  const navigate = useNavigate();
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [adminEmail, setAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [currentAdminType, setCurrentAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [nameChangeNeeded, setNameChangeNeeded] = useState(false);
  const [adminTypeChange, setAdminTypeChange] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const [accountUnlock, setAccountUnlock] = useState(false);

  const [showNewFields, setShowNewFields] = useState(false);
  const [showNewNameField, setShowNewNameField] = useState(false);
  const [showNewAdminField, setShowNewAdminField] = useState(false);

  const [newName, setNewName] = useState("");
  const [newAdminType, setNewAdminType] = useState("");

  const [showApproval, setShowApproval] = useState(false);

  const [showModifyAdminOtp, setShowModifyAdminOtp] = useState(false);

  const requestType = "modifyAdminType";

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
      setShowModifyAdminOtp(true);
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

  const modifyAdminInDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/superAdmin/actions/modifyAdmin/admin-modifications",
        {
          adminEmail,
          currentAdminType,
          otpInput,
          nameChangeNeeded,
          adminTypeChange,
          passwordReset,
          accountUnlock,
          newName,
          newAdminType,
        },
        { withCredentials: true }
      );

      setServerMessage(
        "Admin account modification successful. Refreshing the page in 5 seconds"
      );
      setServerMsgType("success");
      setShowServerMsg(true);

      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    } catch (error) {
      setServerMessage(
        `${error.response?.data?.message}. Refreshing the page in 5 seconds` ||
          "Failed to modify admin account. Refreshing the page in 5 seconds"
      );
      setServerMsgType("error");
      setShowServerMsg(true);
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  useEffect(() => {
    if (adminEmail && currentAdminType) {
      setShowApproval(true);
    } else {
      setShowApproval(false);
    }
  }, [currentAdminType, adminEmail]);

  useEffect(() => {
    if (nameChangeNeeded) {
      setShowNewFields(true);
      setShowNewNameField(true);
    }
    if (adminTypeChange) {
      setShowNewFields(true);
      setShowNewAdminField(true);
    }
    if (!nameChangeNeeded) {
      setShowNewNameField(false);
    }
    if (!adminTypeChange) {
      setShowNewAdminField(false);
    }
    if (!nameChangeNeeded && !adminTypeChange) {
      setShowNewFields(false);
    }
  }, [nameChangeNeeded, adminTypeChange]);

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
        <p className="AdminMgmtActionHeading"> Modify Admin Type</p>
        <span>
          (Scroll down to see the list of current admins to find an admin for
          modifying their admin type)
        </span>
        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            <div className="AdminMgmtInputWrapper">
              <input
                type="email"
                placeholder=" "
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel3">Email</label>
            </div>

            <div className="AdminMgmtInputWrapper">
              <div className="AdminMgmtDropDown">
                <select
                  value={currentAdminType}
                  id="se-adminType"
                  onChange={(e) => setCurrentAdminType(e.target.value)}
                >
                  <option value="">Choose AdminType</option>
                  <option value="SuperAdmin">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Analytics">Analytics</option>
                </select>
                <label htmlFor="se-adminType" className="DropDownLabel">
                  Current Admin Type
                </label>
              </div>
            </div>
          </div>

          {showApproval && (
            <div className="AdminMgmtApprovalWrapper">
              <h4>Choose an action to perform on the account</h4>
              <div className="AdminMgmtModifyActions">
                <div className="AdminMgmtModifyActionsLeft">
                  <input
                    type="checkbox"
                    id="in-modify_admin_name_change"
                    checked={nameChangeNeeded}
                    onChange={(e) => setNameChangeNeeded(e.target.checked)}
                  />
                  <span>Name Change</span>
                </div>
                <div className="AdminMgmtModifyActionsRight">
                  <span>Admin Type</span>
                  <input
                    type="checkbox"
                    id="in-modify_admin_admin_type"
                    checked={adminTypeChange}
                    onChange={(e) => setAdminTypeChange(e.target.checked)}
                  />
                </div>
              </div>
              <div className="AdminMgmtModifyActions">
                <div className="AdminMgmtModifyActionsLeft">
                  <input
                    type="checkbox"
                    id="in-modify_admin_password_reset"
                    checked={passwordReset}
                    onChange={(e) => setPasswordReset(e.target.checked)}
                  />
                  <span>Password Reset</span>
                </div>
                <div className="AdminMgmtModifyActionsRight">
                  <span>Unlock Account</span>
                  <input
                    type="checkbox"
                    id="in-modify_admin_account_unlock"
                    checked={accountUnlock}
                    onChange={(e) => setAccountUnlock(e.target.checked)}
                  />
                </div>
              </div>

              {showNewFields && (
                <div className="AdminConsoleInputsWrapper">
                  {showNewNameField && (
                    <div className="AdminMgmtInputWrapper">
                      <input
                        type="text"
                        placeholder=" "
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        required
                      />
                      <label className="AdminMgmtTextFieldLabel3">
                        New Name
                      </label>
                    </div>
                  )}

                  {showNewAdminField && (
                    <div className="AdminMgmtInputWrapper">
                      <div className="AdminMgmtDropDown">
                        <select
                          value={newAdminType}
                          id="se-newAdminType"
                          onChange={(e) => setNewAdminType(e.target.value)}
                        >
                          <option value="">Choose AdminType</option>
                          <option value="SuperAdmin">Super Admin</option>
                          <option value="Admin">Admin</option>
                          <option value="Analytics">Analytics</option>
                        </select>
                        <label
                          htmlFor="se-newAdminType"
                          className="DropDownLabel"
                        >
                          New Admin Type
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="AdminMgmtApproval">
                <input
                  type="checkbox"
                  id="in-modify_admin_approval"
                  checked={approval}
                  onChange={(e) => setApproval(e.target.checked)}
                />
                <span>
                  I affirm and authorize the above mentioned person to be having
                  this access on this site.
                </span>
              </div>
              <button
                style={{ marginTop: "2rem" }}
                onClick={getVerificationOtp}
                disabled={!approval || !adminEmail || !currentAdminType}
                className="PreviewButton"
              >
                Approve
              </button>
            </div>
          )}

          {showModifyAdminOtp && (
            <div className="AdminMgmtOtpWrapper">
              <div className="AdminMgmtOtp">
                <input
                  type="text"
                  placeholder=" "
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-modify_admin_verify_otp"
                  className="AdminMgmtTextFieldLabel2"
                >
                  Otp
                </label>
              </div>
              <button
                onClick={modifyAdminInDB}
                disabled={!otpInput}
                className="AddInputButtons"
              >
                Modify Permissions
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

export default ModifyAdmin;
