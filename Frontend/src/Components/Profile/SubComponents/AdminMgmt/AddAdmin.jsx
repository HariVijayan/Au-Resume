import { useEffect, useState } from "react";
import axios from "axios";

const AddNewAdmin = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [needApproval, setNeedApproval] = useState(null);
  const [addAdminOtp, setAddAdminOtp] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");

  const [addAdminMessage, setAddAdminMessage] = useState("");
  const [addAdminMessageColor, setAddAdminMessageColor] = useState("red");

  const requestType = "addNewAdmin";

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
      } catch (error) {
        console.error("Error fetching admin data:", error);
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
      if (response.statusText === "OK") {
        setAddAdminOtp(true);
        setOtpReqMessage(
          "An OTP has been sent to your email. Verify to proceed with the request"
        );
        setOtpReqMessageColor("green");
      } else {
        setOtpReqMessageColor("red");
        setOtpReqMessage(response.data.message);
      }
    } catch (error) {
      setOtpReqMessageColor("red");
      setOtpReqMessage(
        "Failed to get otp for verification. Refresh the page and try again."
      );
    }
  };

  const addNewAdminToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/superAdmin/actions/addNewAdmin/newAdmin",
        { newAdminName, newAdminEmail, adminType, otpInput },
        { withCredentials: true }
      );

      if (response.statusText === "OK") {
        setAddAdminMessage(
          `New admin has been added to the site successfully. Refreshing the page in 5 seconds.`
        );
        setAddAdminMessageColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      } else {
        setAddAdminMessageColor("red");
        setAddAdminMessage(response.data.message);
      }
    } catch (error) {
      setAddAdminMessageColor("red");
      setAddAdminMessage(
        "Failed to add new admin. Refreshing the page in 5 seconds. Please try again."
      );
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  useEffect(() => {
    if (newAdminName && newAdminEmail && adminType) {
      setNeedApproval(true);
    } else {
      setNeedApproval(false);
    }
  }, [adminType, newAdminEmail, newAdminName]);

  return (
    <>
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Add New Admins</p>
        <span>
          (Scroll down to see the list of current admins before adding a new
          one)
        </span>
        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            <div className="AdminMgmtInputWrapper">
              <input
                type="text"
                placeholder=" "
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel">Name</label>
            </div>

            <div className="AdminMgmtInputWrapper">
              <input
                type="email"
                placeholder=" "
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel">Email</label>
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

          {needApproval && (
            <div className="AdminMgmtApprovalWrapper">
              <div className="AdminMgmtApproval">
                <input
                  type="checkbox"
                  checked={approval}
                  onChange={(e) => setApproval(e.target.checked)}
                />
                <span>
                  I affirm and authorize the above mentioned person to be a new
                  admin of this site.
                </span>
              </div>
              <button
                style={{ marginTop: "2rem" }}
                onClick={getVerificationOtp}
                disabled={
                  !approval || !newAdminName || !newAdminEmail || !adminType
                }
                className="PreviewButton"
              >
                Approve
              </button>
            </div>
          )}

          {otpReqMessage && (
            <p style={{ color: `${otpReqMessageColor}` }}>{otpReqMessage}</p>
          )}

          {addAdminOtp && (
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
                onClick={addNewAdminToDB}
                disabled={!otpInput}
                className="AddInputButtons"
              >
                Add Admin
              </button>
            </div>
          )}

          {addAdminMessage && (
            <p style={{ color: `${addAdminMessageColor}` }}>
              {addAdminMessage}
            </p>
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

export default AddNewAdmin;
