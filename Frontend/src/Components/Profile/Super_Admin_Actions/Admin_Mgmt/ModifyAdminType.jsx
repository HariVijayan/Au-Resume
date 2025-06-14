import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModifyAdmin = ({ setLogoutClicked, setLogoutUserType }) => {
  const navigate = useNavigate();
  const [adminUsers, setAdminUsers] = useState([]);
  const [numAdmins, setAdminNum] = useState(0);
  const [modifyAdminEmail, setModifyAdminEmail] = useState("");
  const [approval, setApproval] = useState(false);
  const [adminType, setAdminType] = useState("");
  const [otpInput, setOtpInput] = useState("");

  const [showApproval, setShowApproval] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");

  const [showModifyAdminOtp, setShowModifyAdminOtp] = useState(null);
  const [modifyAdminMessage, setModifyAdminMessage] = useState("");
  const [modifyAdminMessageColor, setModifyAdminMessageColor] = useState("red");

  const requestType = "modifyAdminType";

  const logoutUser = () => {
    setLogoutUserType("Admin");
    setLogoutClicked(true);
  };

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
        "http://localhost:5000/superAdmin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      if (response.statusText === "OK") {
        setShowModifyAdminOtp(true);
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
        "http://localhost:5000/superAdmin/actions/modifyAdmin/adminType",
        { modifyAdminEmail, adminType, otpInput },
        { withCredentials: true }
      );

      if (response.statusText === "OK") {
        setModifyAdminMessage(
          `The access type of the mentioned admin has been changed successfully. Refreshing the page in 5 seconds.`
        );
        setModifyAdminMessageColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      } else {
        setModifyAdminMessageColor("red");
        setModifyAdminMessage(response.data.message);
      }
    } catch (error) {
      setModifyAdminMessageColor("red");
      setModifyAdminMessage(
        "Failed to modify admin's access. Refreshing the page in 5 seconds. Please try again."
      );
    }
  };

  useEffect(() => {
    if (modifyAdminEmail && adminType) {
      setShowApproval(true);
    } else {
      setShowApproval(false);
    }
  }, [adminType, modifyAdminEmail]);

  return (
    <>
      <div id="dv-AdminDBWrapper" className="AdminConsoleWrapper">
        <div className="AdminConsoleMainContent">
          <div id="dv-HeaderWrapper" className="AdminConsoleHeader">
            <img
              src="/Au Logo.png"
              id="img-HeaderImage"
              alt="AU Logo"
              className="AdminConsoleHeaderImg"
            ></img>
            <h1 id="h1-HeaderTitle" className="AdminConsoleHeaderTitle">
              AU Resume Builder
            </h1>
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
          <div id="dv-AdminDBType" className="AdminConsoleHeading">
            <p
              className="AdminDashboardLink"
              onClick={() =>
                navigate("/admin-dashboard/super-admin/admin-management")
              }
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
              Admin Management
            </p>
            <span>
              Admin Type: <span style={{ color: "red" }}>Super Admin</span>
            </span>
          </div>
          <div className="AddAdminsWrapper">
            <p className="AdminMgmtActionHeading"> Modify Admin Type</p>
            <span>
              (Scroll down to see the list of current admins to find an admin
              for modifying their admin type)
            </span>
            <div className="AdminMgmtActions">
              <div className="AdminConsoleInputsWrapper">
                <div className="AdminMgmtInputWrapper">
                  <input
                    type="email"
                    placeholder=" "
                    value={modifyAdminEmail}
                    onChange={(e) => setModifyAdminEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="in-add_admin_email"
                    className="AdminMgmtTextFieldLabel3"
                  >
                    Email
                  </label>
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
                      id="in-add_admin_approval"
                      checked={approval}
                      onChange={(e) => setApproval(e.target.checked)}
                    />
                    <span>
                      I affirm and authorize the above mentioned person to be
                      having this access on this site.
                    </span>
                  </div>
                  <button
                    style={{ marginTop: "2rem" }}
                    onClick={getVerificationOtp}
                    disabled={!approval || !modifyAdminEmail || !adminType}
                    className="PreviewButton"
                  >
                    Approve
                  </button>
                </div>
              )}

              {otpReqMessage && (
                <p style={{ color: `${otpReqMessageColor}` }}>
                  {otpReqMessage}
                </p>
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
                      htmlFor="in-add_admin_verify_otp"
                      className="AdminMgmtTextFieldLabel2"
                    >
                      Otp
                    </label>
                  </div>
                  <button
                    onClick={addNewAdminToDB}
                    disabled={!otpInput}
                    className="AddInputButtons"
                  >
                    Modify Permissions
                  </button>
                </div>
              )}

              {modifyAdminMessage && (
                <p style={{ color: `${modifyAdminMessageColor}` }}>
                  {modifyAdminMessage}
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
        </div>
      </div>
    </>
  );
};

export default ModifyAdmin;
