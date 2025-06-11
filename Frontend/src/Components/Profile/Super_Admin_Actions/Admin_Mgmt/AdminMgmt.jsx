import { useNavigate } from "react-router-dom";

const AdminMgmt = ({ setLogoutClicked }) => {
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
          <p
            className="AdminDashboardLink"
            onClick={() => navigate("/admin-dashboard/super-admin")}
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
            Admin Dashboard
          </p>
          <span>
            Access Level: <span style={{ color: "red" }}>Super Admin</span>
          </span>
        </div>

        <div className="AdminConsoleActionsWrapper">
          <div
            className="AdminConsoleActionCard"
            onClick={() =>
              navigate(
                "/admin-dashboard/super-admin/admin-management/add-admin"
              )
            }
          >
            <div className="CardTitle">Add New Admins</div>
            <div className="CardContent">
              <span>
                Use this to add new admins to manage this site. Please note that
                you've to manually verify your identity through an OTP sent to
                your registered email to save changes. It will be recorded that
                you're the one who is adding this new admin.
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
              navigate("/admin-dashboard/super-admin/user-management")
            }
          >
            <div className="CardTitle">Remove Existing Admins</div>
            <div className="CardContent">
              <span>
                Use this to remove existing admins from this site. Please note
                that you've to manually verify your identity through an OTP sent
                to your registered email to save changes. It will be recorded
                that you're the one who removed this existing admin.
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
              navigate("/admin-dashboard/super-admin/log-management")
            }
          >
            <div className="CardTitle">Modify Admin Permissions</div>
            <div className="CardContent">
              <span>
                Use this to modify existing admin's permissions. You can elevate
                existing admin's permissions to be super admins or limit
                existing admin's permissions to be having analytics only
                (ViewOnly) access.
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
      </div>
    </>
  );
};

export default AdminMgmt;
