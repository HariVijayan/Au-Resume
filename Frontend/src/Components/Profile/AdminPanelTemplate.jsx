import AdminPanelHeader from "./Header.jsx";
import Stack from "@mui/material/Stack";

const AdminPanelTemplate = ({
  backArrowPageName,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
  AdminConsoleContent,
}) => {
  return (
    <>
      <AdminPanelHeader
        backArrowPageName={backArrowPageName}
        headerAdminType={headerAdminType}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
      />
      <Stack
        id="ContentWrapper"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <AdminConsoleContent />
      </Stack>
    </>
  );
};

export default AdminPanelTemplate;
