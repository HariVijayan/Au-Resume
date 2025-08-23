import Box from "@mui/material/Box";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      id="FooterWrapper"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.background.default,
        padding: "1rem 0rem",
      }}
      marginTop={{ xs: "3rem", md: "5rem" }}
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Box
        component="img"
        src="/Au Logo.png"
        alt="AU Logo"
        sx={{ height: "3.5rem", width: "3.5rem", marginRight: "1rem" }}
      ></Box>
      <Typography
        variant="h6"
        textAlign={"center"}
        sx={{ xs: { padding: "0rem 1rem" }, md: { padding: "0rem 1rem" } }}
      >
        For any questions or concerns, please reach out to admin@auist.net
      </Typography>
    </Box>
  );
};

export default Footer;
