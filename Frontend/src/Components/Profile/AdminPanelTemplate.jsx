import AdminPanelHeader from "./Header.jsx";
import Box from "@mui/material/Box";

const AdminPanelTemplate = ({
  backArrowPageName,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
  AdminConsoleContent,
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
            flexShrink: 0,
            paddingBottom: "3rem",
          }}
        >
          <AdminPanelHeader
            backArrowPageName={backArrowPageName}
            headerAdminType={headerAdminType}
            setLogoutClicked={setLogoutClicked}
            setLogoutUserType={setLogoutUserType}
          />
          <AdminConsoleContent />
        </Box>
      </Box>
    </>
  );
};

export default AdminPanelTemplate;
