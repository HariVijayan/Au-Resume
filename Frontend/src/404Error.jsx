import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Error404Page = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "center", width: "100%" }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
        >
          The site that your're looking for doesn't exist.{" "}
          <Typography
            variant="h5"
            sx={{ color: "red", cursor: "pointer", paddingLeft: "5px" }}
            onClick={() => navigate("/")}
          >
            Click here to go back to main page.
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

export default Error404Page;
