import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./MainStyleSheet.css";
import MainApp from "./MainApp.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";

createRoot(document.getElementById("dv-MainWrapper")).render(
  <StrictMode>
    <>
      <Sidebar />
      <div id="dv-BodyWrapper">
        <MainApp />
      </div>
      <Footer />
    </>
  </StrictMode>
);
