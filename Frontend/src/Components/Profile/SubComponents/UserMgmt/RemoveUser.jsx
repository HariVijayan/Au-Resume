import { useEffect, useState } from "react";
import axios from "axios";

const RemoveUser = () => {
  const requestType = "removeNewUser";

  const [usersList, setUsersList] = useState([]);
  const [opertationType, setOpertationType] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [showGetListButton, setShowGetListButton] = useState(null);
  const [approval, setApproval] = useState(false);
  const [needApprovalSingle, setNeedApprovalSingle] = useState(null);
  const [needApprovalMul, setNeedApprovalMul] = useState(null);

  const [showOtp, setShowOtp] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");
  const [otpInput, setOtpInput] = useState("");

  const [finalResult, setFinalResult] = useState("");
  const [finalResultColor, setFinalResultColor] = useState("red");

  const [remUserEmail, setRemUserEmail] = useState("");
  const [remUserRegNo, setRemUserRegNo] = useState("");

  const [commonEmailSuffix, setCommonEmailSuffix] = useState(
    "@student.annauniv.edu"
  );
  const [commonRegNoPrefix, setCommonRegNoPrefix] = useState("");
  const [commonRegNoStart, setCommonRegNoStart] = useState("");
  const [commonRegNoEnd, setCommonRegNoEnd] = useState("");
  const [skipRegNo, setSkipRegNoEnd] = useState("");

  useEffect(() => {
    if (
      opertationType === "Multiple" &&
      commonEmailSuffix &&
      commonRegNoPrefix &&
      commonRegNoStart &&
      commonRegNoEnd
    ) {
      setShowGetListButton(true);
    }
    if (opertationType === "Single" && remUserEmail && remUserRegNo) {
      setShowGetListButton(true);
    } else if (opertationType != "Single" && opertationType != "Multiple") {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
      setShowGetListButton(false);
    }
  }, [
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    remUserEmail,
    remUserRegNo,
  ]);

  const modifyAddUserOperation = (newOperationType) => {
    if (newOperationType === "Single") {
      setCommonEmailSuffix("@student.annauniv.edu");
      setCommonRegNoPrefix("");
      setCommonRegNoStart("");
      setCommonRegNoEnd("");
      setOpertationType("Single");
    }
    if (newOperationType === "Multiple") {
      setRemUserEmail("");
      setRemUserRegNo("");
      setOpertationType("Multiple");
    }
  };

  const getFinalUserList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/removeUser/get-final-users",
        {
          opertationType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          remUserEmail,
          remUserRegNo,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUsersList(response.data.usersList);
        setShowUsers(true);
        if (opertationType === "Single") {
          setNeedApprovalSingle(true);
          setNeedApprovalMul(false);
        }
        if (opertationType === "Multiple") {
          setNeedApprovalMul(true);
          setNeedApprovalSingle(false);
        }
      }
    } catch (error) {
      console.error(error.response.data.message || "Failed to fetch user list");
    }
  };

  const getVerificationOtp = async () => {
    if (opertationType === "Multiple") {
      if (parseInt(commonRegNoEnd) - parseInt(commonRegNoStart) > 100) {
        setOtpReqMessageColor("red");
        setOtpReqMessage(
          "You can only remove upto 100 users at a time. Please reduce the user range and complete in multiple requests if needed."
        );
        return;
      }
      if (parseInt(commonRegNoEnd) < parseInt(commonRegNoStart)) {
        setOtpReqMessageColor("red");
        setOtpReqMessage(
          "The end register number cannot be less than the start register number. Please correct the range."
        );
        return;
      }
    }
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

  const removeUserFromDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/existingUser/removeUser",
        {
          opertationType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          remUserEmail,
          remUserRegNo,
          otpInput,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setFinalResult(
          `New user(s) have been added to the site successfully. Refreshing the page in 5 seconds.`
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
          "Failed to add new user(s). Refreshing the page in 5 seconds. Please try again."
      );
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  return (
    <>
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Remove Existing Users</p>
        <span>
          (Cross verify each user's details [email, register number]
          individually before removing them from the site.)
        </span>
        <div className="UserMgmtButtons">
          <button
            className="LeftNavigationButtons"
            onClick={() => modifyAddUserOperation("Single")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            Single User
          </button>
          <button
            className="RightNavigationButtons"
            onClick={() => modifyAddUserOperation("Multiple")}
          >
            Multiple Users
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
            </svg>
          </button>
        </div>
        {opertationType === "Single" && (
          <div className="AddSingleUserWrapper">
            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="email"
                  placeholder=" "
                  value={remUserEmail}
                  onChange={(e) => setRemUserEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_email"
                  className="RegisterTextFieldLabel"
                >
                  Email
                </label>
              </div>

              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={remUserRegNo}
                  onChange={(e) => setRemUserRegNo(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Register Number
                </label>
              </div>
            </div>
          </div>
        )}
        {opertationType === "Multiple" && (
          <div className="AddMultipleUserWrapper">
            <div className="AuthenticationInputWrapper">
              <input
                type="number"
                placeholder=" "
                value={commonRegNoPrefix}
                onChange={(e) => setCommonRegNoPrefix(e.target.value)}
                required
              />
              <label className="AuthenticationTextFieldLabel">
                Reg No. Prefix
              </label>
            </div>
            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={commonRegNoStart}
                  onChange={(e) => setCommonRegNoStart(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Reg No. Start
                </label>
              </div>
              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={commonRegNoEnd}
                  onChange={(e) => setCommonRegNoEnd(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Reg No. End
                </label>
              </div>
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="text"
                  placeholder=" "
                  value={skipRegNo}
                  onChange={(e) => setSkipRegNoEnd(e.target.value)}
                  required
                />
                <label className="RegisterTextFieldLabel">Skip Reg No</label>
              </div>
              <div className="RegisterInputWrapper">
                <input
                  type="text"
                  placeholder=" "
                  value={commonEmailSuffix}
                  onChange={(e) => setCommonEmailSuffix(e.target.value)}
                  required
                />
                <label className="RegisterTextFieldLabel">
                  Common Email Suffix
                </label>
              </div>
            </div>
          </div>
        )}

        {showGetListButton && (
          <button
            style={{ marginTop: "2rem" }}
            onClick={getFinalUserList}
            className="DownloadButton"
          >
            Get User List
          </button>
        )}

        {showUsers && (
          <div className="ListAdminsWrapper">
            <div className="AdminsListHeading">
              <p className="AdminTableHeading">
                The below users will be removed
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

        {needApprovalSingle && (
          <div className="AdminMgmtApprovalWrapper">
            <div className="AdminMgmtApproval">
              <input
                type="checkbox"
                checked={approval}
                onChange={(e) => setApproval(e.target.checked)}
              />
              <span>
                I affirm and authorize the above mentioned person to be removed
                from this site.
              </span>
            </div>
            <button
              style={{ marginTop: "2rem" }}
              onClick={getVerificationOtp}
              disabled={!approval || !remUserEmail || !remUserRegNo}
              className="PreviewButton"
            >
              Approve
            </button>
          </div>
        )}

        {needApprovalMul && (
          <div className="AdminMgmtApprovalWrapper">
            <div className="AdminMgmtApproval">
              <input
                type="checkbox"
                checked={approval}
                onChange={(e) => setApproval(e.target.checked)}
              />
              <span>
                I affirm and authorize the above mentioned persons to be removed
                from this site.
              </span>
            </div>
            <button
              style={{ marginTop: "2rem" }}
              onClick={getVerificationOtp}
              disabled={
                !approval ||
                !commonEmailSuffix ||
                !commonRegNoStart ||
                !commonRegNoEnd
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
              onClick={removeUserFromDB}
              disabled={!otpInput}
              className="AddInputButtons"
            >
              Remove User
            </button>
          </div>
        )}

        {finalResult && (
          <p style={{ color: `${finalResultColor}` }}>{finalResult}</p>
        )}
      </div>
    </>
  );
};

export default RemoveUser;
