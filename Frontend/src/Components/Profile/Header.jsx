import { useNavigate } from "react-router-dom";

const AdminPanelHeader = ({
  backArrowPageName,
  backArrowLink,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
}) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    setLogoutUserType("Admin");
    setLogoutClicked(true);
  };
  return (
    <>
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
          onClick={() => navigate(backArrowLink)}
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
          {backArrowPageName}
        </p>
        <span>
          Admin Type: <span style={{ color: "red" }}>{headerAdminType}</span>
        </span>
      </div>
    </>
  );
};

export default AdminPanelHeader;
