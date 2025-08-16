import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "white",
    },
    primary: {
      main: "#377dff",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.6)",
    },
    custom: {
      brown: "#663b13",
    },
    button: {
      general: "#555555",
      preview: "#5a67d8",
      add: "#377dff",
      submit: "#04aa6d",
    },
  },
  typography: {
    htmlFontSize: 10,
    fontFamily: "Segoe UI, Helvetica, Verdana, Arial",
    h1: {
      fontSize: "3.5rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.5rem",
    },
    h4: {
      fontSize: "2rem",
    },
    h5: {
      fontSize: "1.7rem",
    },
    h6: {
      fontSize: "1.5rem",
    },
    p: {
      fontSize: "2rem",
    },
  },

  custom: {
    svgSize: "2.5rem",
    shadows: {
      general: "rgba(0, 0, 0, 0.5) 0 8px 15px",
      generalButton: "rgba(77, 77, 77, 0.8) 0 8px 15px",
      previewButton: "rgba(90, 103, 216, 0.8) 0 8px 15px",
      addButton: "rgba(55, 125, 255, 0.8) 0 8px 15px",
      submitButton: "rgba(4, 150, 96, 0.8) 0 8px 15px",
    },
    accentColor: "#377dff",
  },
});

export default theme;
