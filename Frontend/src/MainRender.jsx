import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./MainStyleSheet.css";
import MainApp from "./MainApp.jsx";
import Footer from "./Components/Resume_Builder/Sub_Components/Footer.jsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";
import Box from "@mui/material/Box";

createRoot(document.getElementById("dv-MainWrapper")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <>
        <Box
          id="PageWrapper"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "100%",
            margin: "2vh 0vh 0vh 0vh",
            minHeight: "98vh",
          }}
        >
          <MainApp />
        </Box>
      </>
    </StrictMode>
  </ThemeProvider>
);
