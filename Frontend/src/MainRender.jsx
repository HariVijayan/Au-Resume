import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./MainStyleSheet.css";
import MainApp from "./MainApp.jsx";
import Footer from "./Footer.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import Container from "@mui/material/Container";

createRoot(document.getElementById("dv-MainWrapper")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "2vh 0vh",
          }}
          maxWidth="xl"
        >
          <MainApp />
        </Container>
        <Footer />
      </>
    </StrictMode>
  </ThemeProvider>
);
