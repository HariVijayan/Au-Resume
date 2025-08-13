import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const AuthenticationPagesWrapper = styled(Stack)(() => ({
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  minHeight: "100vh",
  flexDirection: "column",
  margin: "2rem 0rem",
  width: "90%", // Layout width for mobile screen
  "@media (min-width:600px)": {
    width: "80%",
  },
  "@media (min-width:900px)": {
    width: "70%",
  },
  "@media (min-width:1200px)": {
    width: "60%",
  },
}));

const DualInputWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  flexDirection: "column", // Layout alignment for mobile screen
  "@media (min-width:600px)": {
    flexDirection: "row", // Layout alignment for tablet screen and above
  },
}));

const DualInputBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "90%", // Width for mobile screen
  "@media (min-width:600px)": {
    width: "50%", // Width for tablet screen and above
  },
}));

export { AuthenticationPagesWrapper, DualInputWrapper, DualInputBox };
