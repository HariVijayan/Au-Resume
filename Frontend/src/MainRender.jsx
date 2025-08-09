import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./MainStyleSheet.css";
import MainApp from "./MainApp.jsx";
import Footer from "./Footer.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

createRoot(document.getElementById("dv-MainWrapper")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <>
        <div id="dv-BodyWrapper">
          <MainApp />
        </div>
        <Footer />
      </>
    </StrictMode>
  </ThemeProvider>
);
