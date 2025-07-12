import { useNavigate } from "react-router-dom";

const UserMgmt = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="AdminConsoleActionsWrapper">
        <div
          className="AdminConsoleActionCard"
          onClick={() => navigate("/admin-dashboard/user-management/add-user")}
        >
          <div className="CardTitle">Add New Users</div>
          <div className="CardContent">
            <span>
              Use this to add new users to access this site. Please note that
              you've to manually verify your identity through an OTP sent to
              your registered email to save changes.
            </span>
          </div>
          <div className="CardLink">
            <span className="CardContentLink">
              Open{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </span>
          </div>
        </div>

        <div
          className="AdminConsoleActionCard"
          onClick={() =>
            navigate("/admin-dashboard/user-management/remove-user")
          }
        >
          <div className="CardTitle">Remove Existing Users</div>
          <div className="CardContent">
            <span>
              Use this to remove existing users from accessing this site. Please
              note that you've to manually verify your identity through an OTP
              sent to your registered email to save changes.
            </span>
          </div>
          <div className="CardLink">
            <span className="CardContentLink">
              Open{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </span>
          </div>
        </div>

        <div
          className="AdminConsoleActionCard"
          onClick={() =>
            navigate("/admin-dashboard/user-management/modify-user")
          }
        >
          <div className="CardTitle">Modify User Account</div>
          <div className="CardContent">
            <span>
              Use this to unlock account, reset password of existing user
              accounts.
            </span>
          </div>
          <div className="CardLink">
            <span className="CardContentLink">
              Open{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMgmt;
