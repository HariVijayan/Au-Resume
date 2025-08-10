import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminPanelHeader = ({
  backArrowPageName,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
}) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    setLogoutUserType("Admin");
    setLogoutClicked(true);
  };
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Box
          component="img"
          src="/Au Logo.png"
          alt="AU Logo"
          sx={{ width: "100px", height: "100px" }}
        ></Box>
        <Typography
          variant="h3"
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          AU Resume Builder
        </Typography>
        <LogoutIcon onClick={logoutUser} sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          marginTop: "2rem",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            ":hover": { color: theme.palette.primary.main },
          }}
          variant="h5"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ fill: theme.palette.primary.main }} />
          {backArrowPageName}
        </Typography>
        <Typography variant="h5" sx={{ display: "flex", gap: "0.5rem" }}>
          Admin Type:{" "}
          <Typography variant="h5" sx={{ color: theme.palette.error.main }}>
            {headerAdminType}
          </Typography>
        </Typography>
      </Box>
    </>
  );
};

export default AdminPanelHeader;
