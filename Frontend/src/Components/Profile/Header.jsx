import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AdminPanelHeader = ({
  backArrowPageName,
  headerAdminType,
  setLogoutClicked,
  setLogoutUserType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutUser = () => {
    setLogoutUserType("Admin");
    setLogoutClicked(true);
  };
  const theme = useTheme();
  return (
    <Box
      id="HeaderWrapper"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          component="img"
          src="/Au Logo.png"
          alt="AU Logo"
          sx={{
            width: "7vw",
            height: "auto",
            maxHeight: "100px",
            minHeight: "40px",
          }}
          // width={{ xs: "30px", sm: "50px", md: "75px", lg: "100px" }}
        ></Box>
        <Typography
          variant="h4"
          sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
        >
          AU Resume Builder
        </Typography>
        <IconButton aria-label="logout user" color="error" onClick={logoutUser}>
          <LogoutIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
          flexWrap: "wrap",
          gap: "2rem",
        }}
        justifyContent={{ xs: "center", sm: "space-between" }}
      >
        {location.pathname != "/admin-dashboard/super-admin" &&
        location.pathname != "/admin-dashboard/admin-general" &&
        location.pathname != "/admin-dashboard/analytics" ? (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              ":hover": { color: theme.palette.primary.main },
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon
              sx={{ ":hover": { fill: theme.palette.primary.main } }}
            />
            {backArrowPageName}
          </Typography>
        ) : (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Admin Dashboard
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Typography>Admin Type:</Typography>

          <Typography sx={{ color: theme.palette.error.main }}>
            {headerAdminType}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPanelHeader;
