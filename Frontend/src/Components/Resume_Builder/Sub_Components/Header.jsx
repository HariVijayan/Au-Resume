import { useNavigate, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { IconButton, useTheme } from "@mui/material";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BackupIcon from "@mui/icons-material/Backup";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const ResumePagesHeader = ({
  currentPage,
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
  PageIcon,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutUser = () => {
    setLogoutUserType("User");
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
          flexDirection: "column",
          "@media (min-width:700px)": {
            flexDirection: "row",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "1rem 0rem",
            width: "100%",
            justifyContent: "center",
            "@media (min-width:700px)": {
              width: "70%",
              justifyContent: "flex-start",
            },
          }}
        >
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              "& ol": {
                justifyContent: "center",
              },
            }}
          >
            <Link
              underline="hover"
              onClick={() => navigate("/resume-builder/template-choosing")}
              sx={{
                color: theme.palette.primary.main,
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              RESUME BUILDER
            </Link>
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {currentPage}
              <PageIcon sx={{ paddingLeft: "1rem" }} />
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "1rem 0rem",
            width: "100%",
            "@media (min-width:700px)": {
              width: "30%",
            },
          }}
        >
          <IconButton
            aria-label="fingerprint"
            sx={{ color: theme.palette.custom.brown }}
            onClick={() => setOverlayType("FetchResume")}
          >
            <CloudDownloadIcon />
          </IconButton>
          <IconButton
            aria-label="fingerprint"
            color="success"
            onClick={() => setOverlayType("SaveResume")}
          >
            <BackupIcon />
          </IconButton>
          <IconButton
            aria-label="fingerprint"
            color="primary"
            onClick={() => navigate("/user-profile")}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            aria-label="fingerprint"
            color="error"
            onClick={logoutUser}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default ResumePagesHeader;
