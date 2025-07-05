import AdminPanelHeader from "./Header.jsx";

const AdminPanelTemplate = ({
  backArrowPageName,
  backArrowLink,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
  AdminConsoleContent,
}) => {
  return (
    <>
      <div id="dv-AdminDBWrapper" className="AdminConsoleWrapper">
        <div className="AdminConsoleMainContent">
          <AdminPanelHeader
            backArrowPageName={backArrowPageName}
            backArrowLink={backArrowLink}
            headerAdminType={headerAdminType}
            setLogoutClicked={setLogoutClicked}
            setLogoutUserType={setLogoutUserType}
          />
          <AdminConsoleContent />
        </div>
      </div>
    </>
  );
};

export default AdminPanelTemplate;
