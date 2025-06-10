import { useNavigate } from "react-router-dom";

const SuperAdmin = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper" className="AdminConsoleWrapper">
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
            onClick={() => setLogoutClicked(true)}
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
          <p>Admin Dashboard</p>
          <span>
            Access Level: <span style={{ color: "red" }}>Admin</span>
          </span>
        </div>

        <div className="AdminConsoleActionsWrapper">
          <div
            className="AdminConsoleActionCard"
            onClick={() =>
              navigate("/admin-dashboard/admin-general/user-management")
            }
          >
            <div className="CardTitle">User Management</div>
            <div className="CardContent">
              <ul className="CardContentList">
                <li>Add New Users</li>
                <li>Remove Existing Users</li>
                <li>View Current Users</li>
                <li>Modify User Details</li>
              </ul>
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
              navigate("/admin-dashboard/admin-general/log-management")
            }
          >
            <div className="CardTitle">Logs Management</div>
            <div className="CardContent">
              <ul className="CardContentList">
                <li>View Admin Logs</li>
                <li>View Users Logs</li>
                <li>Download Logs</li>
                <li>Clear Logs</li>
              </ul>
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
      </div>
    </>
  );
};

export default SuperAdmin;
