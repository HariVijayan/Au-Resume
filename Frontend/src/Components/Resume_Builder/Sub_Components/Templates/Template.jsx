import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material";

const Template = ({ setLogoutClicked, setLogoutUserType }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const logoutUser = () => {
    setLogoutUserType("User");
    setLogoutClicked(true);
  };

  let { updateField } = ResumeInputTemplate();

  const choseTemplate = async (templateName) => {
    updateField("metaData.template", templateName);
    navigate("/resume-builder/basic-details");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            width: "100%",
          }}
        >
          <PersonOutlineIcon
            onClick={() => navigate("/user-profile")}
            sx={{ cursor: "pointer" }}
          />
          <LogoutIcon onClick={logoutUser} sx={{ cursor: "pointer" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            Choose a template to get started
          </Typography>
        </Box>
      </Box>

      <Grid
        container
        spacing={{ xs: 2, sm: 4 }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Box
            component="img"
            src="/Templates/Template 1.jpg"
            alt="Template 1"
            sx={{
              width: { xs: "90%", sm: "300px", md: "350px" },
              height: "auto",
              borderRadius: "25px",
              boxShadow: (theme) => theme.custom.shadows.general,
              cursor: "pointer",
            }}
            onClick={() => choseTemplate("template1")}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
          <Box
            component="img"
            src="/Templates/More Templates.jpg"
            alt="Template 2"
            sx={{
              width: { xs: "90%", sm: "300px", md: "350px" },
              height: "auto",
              borderRadius: "25px",
              boxShadow: (theme) => theme.custom.shadows.general,
              cursor: "pointer",
            }}
            onClick={() => choseTemplate("template1")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Template;
