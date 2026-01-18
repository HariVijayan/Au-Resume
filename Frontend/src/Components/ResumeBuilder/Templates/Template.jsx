import { useNavigate } from "react-router-dom";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
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
        id="HeaderWrapper"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "3rem",
            width: "90%",
            margin: "1rem 0rem",
          }}
        >
          <IconButton
            aria-label="user profile"
            color="primary"
            onClick={() => navigate("/user-profile")}
          >
            <PersonIcon />
          </IconButton>
          <IconButton
            aria-label="logout user"
            color="error"
            onClick={logoutUser}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", textAlign: "center", margin: "1rem" }}
          >
            Choose a template to get started
          </Typography>
        </Box>
      </Box>

      <Box
        id="TemplatesWrapper"
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          gap: "3rem",
          flexWrap: "wrap",
          alignItems: "center",
          margin: "3rem",
          width: "90%",
          padding: "3rem 0rem",
        }}
      >
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
      </Box>
    </>
  );
};

export default Template;
