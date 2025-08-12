import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Header = ({ headerTitle }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "1rem 0rem",
        }}
      >
        <Box
          component="img"
          src="/Au Logo.png"
          alt="AU Logo"
          sx={{
            height: "auto",
            width: "5vw",
            marginRight: "2rem",
            minWidth: "75px",
          }}
        ></Box>
        <Typography
          sx={{ xs: { padding: "0rem 1rem" }, md: { padding: "0rem 1rem" } }}
        >
          Department of IST
        </Typography>
      </Box>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {headerTitle}
      </Typography>
    </>
  );
};

export default Header;
