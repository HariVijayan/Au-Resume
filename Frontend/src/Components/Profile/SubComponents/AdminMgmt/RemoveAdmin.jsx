import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RemoveAdmin = () => {
  const navigate = useNavigate();
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [remAdminEmail, setRemAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [showApproval, setShowApproval] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");

  const [showRemAdminOtp, setShowRemAdminOtp] = useState(null);
  const [remAdminMessage, setRemAdminMessage] = useState("");
  const [remAdminMessageColor, setRemAdminMessageColor] = useState("red");

  const requestType = "removeAdmin";

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
        setShowRemAdminOtp(true);
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

  const removeAdminFromDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/superAdmin/actions/existingAdmin/removeAdmin",
        { remAdminEmail, adminType, otpInput },
        { withCredentials: true }
      );

      if (response.statusText === "OK") {
        setRemAdminMessage(
          `The mentioned admin has been removed from the site successfully. Refreshing the page in 5 seconds.`
        );
        setRemAdminMessageColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      } else {
        setRemAdminMessageColor("red");
        setRemAdminMessage(response.data.message);
      }
    } catch (error) {
      setRemAdminMessageColor("red");
      setRemAdminMessage(
        "Failed to remove new admin. Refreshing the page in 5 seconds. Please try again."
      );
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

          {otpReqMessage && (
            <p style={{ color: `${otpReqMessageColor}` }}>{otpReqMessage}</p>
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

          {remAdminMessage && (
            <p style={{ color: `${remAdminMessageColor}` }}>
              {remAdminMessage}
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

export default RemoveAdmin;
