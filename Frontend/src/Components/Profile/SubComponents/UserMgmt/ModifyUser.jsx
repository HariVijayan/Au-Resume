import { useEffect, useState } from "react";
import axios from "axios";

const ModifyUser = () => {
  const requestType = "modifyUser";

  const [modifyUserEmail, setModifyUserEmail] = useState("");
  const [modifyUserRegNo, setModifyUserRegNo] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [accountUnlock, setAccountUnlock] = useState(false);

  const [accountActions, setAccountActions] = useState(null);

  const [usersList, setUsersList] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showGetListButton, setShowGetListButton] = useState(null);
  const [approval, setApproval] = useState(false);
  const [needApproval, setNeedApproval] = useState(null);

  const [showOtp, setShowOtp] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");
  const [otpInput, setOtpInput] = useState("");

  const [finalResult, setFinalResult] = useState("");
  const [finalResultColor, setFinalResultColor] = useState("red");

  useEffect(() => {
    if (modifyUserEmail && modifyUserRegNo) {
      setShowGetListButton(true);
    } else {
      setShowGetListButton(false);
    }
  }, [modifyUserEmail, modifyUserRegNo]);

  const getFinalUserList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/modifyUser/get-final-users",
        {
          modifyUserEmail,
          modifyUserRegNo,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUsersList(response.data.usersList);
        setShowUsers(true);
        setAccountActions(true);
        setNeedApproval(true);
      }
    } catch (error) {
      console.error(error.response.data.message || "Failed to fetch user list");
    }
  };

  const getVerificationOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setShowOtp(true);
        setOtpReqMessage(
          "An OTP has been sent to your email. Verify to proceed with the request"
        );
        setOtpReqMessageColor("green");
      }
    } catch (error) {
      setOtpReqMessageColor("red");
      setOtpReqMessage(response.data.message || "Failed to get OTP");
    }
  };

  const modifyUserDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/modifyAccount/modifyUser",
        {
          modifyUserEmail,
          modifyUserRegNo,
          passwordReset,
          accountUnlock,
          otpInput,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFinalResult(
          `The requested modifications have been performed successfully. Refreshing the page in 5 seconds.`
        );
        setFinalResultColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      }
    } catch (error) {
      setFinalResultColor("red");
      setFinalResult(
        error.response.data.message ||
          "Failed to modify user account. Refreshing the page in 5 seconds. Please try again."
      );
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  return (
    <>
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Modify User Account</p>
        <span>
          (Cross verify each user's details [email, register number] before
          making changes in the account.)
        </span>
        <div className="AdminMgmtActions">
          <div className="AdminConsoleInputsWrapper">
            <div className="AdminMgmtInputWrapper">
              <input
                type="email"
                placeholder=" "
                value={modifyUserEmail}
                onChange={(e) => setModifyUserEmail(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel3">Email</label>
            </div>

            <div className="AdminMgmtInputWrapper">
              <input
                type="number"
                placeholder=" "
                value={modifyUserRegNo}
                onChange={(e) => setModifyUserRegNo(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel3">
                Register Number
              </label>
            </div>
          </div>

          {showGetListButton && (
            <button
              style={{ marginTop: "2rem" }}
              onClick={getFinalUserList}
              className="DownloadButton"
            >
              Get User Details
            </button>
          )}

          {showUsers && (
            <div className="ListAdminsWrapper">
              <div className="AdminsListHeading">
                <p className="AdminTableHeading">
                  The changes will be made in this user's account
                </p>
              </div>
              <div className="AdminsList">
                <table className="CurrentAdminsTable">
                  <thead>
                    <tr>
                      <th>Reg No.</th>
                      <th>Email</th>
                      <th>Dept.</th>
                      <th>Course Type</th>
                      <th>Programme</th>
                      <th>Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((user, index) => (
                      <tr key={index}>
                        <td>{user.registerNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.department}</td>
                        <td>{user.courseType}</td>
                        <td>{user.programme}</td>
                        <td>{user.branch}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {accountActions && (
            <>
              <h4>Choose an action to perform on the account</h4>
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
            </>
          )}

          {needApproval && (
            <div className="AdminMgmtApprovalWrapper">
              <div className="AdminMgmtApproval">
                <input
                  type="checkbox"
                  checked={approval}
                  onChange={(e) => setApproval(e.target.checked)}
                />
                <span>
                  I affirm and authorize the above mentioned changes to be
                  reflected in the user's account.
                </span>
              </div>
              <button
                style={{ marginTop: "2rem" }}
                onClick={getVerificationOtp}
                disabled={!approval || !modifyUserEmail || !modifyUserRegNo || !(passwordReset || accountUnlock)}
                className="PreviewButton"
              >
                Approve
              </button>
            </div>
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
                onClick={modifyUserDetails}
                disabled={!otpInput}
                className="AddInputButtons"
              >
                Confirm changes
              </button>
            </div>
          )}

          {finalResult && (
            <p style={{ color: `${finalResultColor}` }}>{finalResult}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyUser;
