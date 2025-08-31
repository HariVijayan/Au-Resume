import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DownloadIcon from "@mui/icons-material/Download";
import Button from "@mui/material/Button";

const NavigationButtons = ({
  PreviousPageName,
  PreviousPageLink,
  NextPageName,
  NextPageLink,
  setSubmitClicked,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        id="LeftContentNavButtons"
        sx={{
          display: "flex",
          justifyContent: PreviousPageName != "" ? "space-between" : "flex-end",
          alignItems: "center",
          width: "100%",
        }}
        gap="1rem"
      >
        {PreviousPageName != "" && (
          <Button
            variant="contained"
            onClick={() => navigate(PreviousPageLink)}
            size="large"
            startIcon={<KeyboardDoubleArrowLeftIcon />}
            sx={{ margin: "2rem 0rem", textTransform: "none" }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            {PreviousPageName}
          </Button>
        )}

        {NextPageName != "Download" && (
          <Button
            variant="contained"
            onClick={() => navigate(NextPageLink)}
            size="large"
            endIcon={<KeyboardDoubleArrowRightIcon />}
            sx={{ margin: "2rem 0rem", textTransform: "none" }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            {NextPageName}
          </Button>
        )}

        {NextPageName === "Download" && (
          <Button
            variant="contained"
            color="success"
            onClick={() => setSubmitClicked(true)}
            size="large"
            endIcon={<DownloadIcon />}
            sx={{ margin: "2rem 0rem", textTransform: "none" }}
            padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
          >
            {NextPageName}
          </Button>
        )}
      </Box>
    </>
  );
};

export default NavigationButtons;
