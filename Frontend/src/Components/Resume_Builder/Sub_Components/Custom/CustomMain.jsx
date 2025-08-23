import { useState, useEffect } from "react";
import ListType from "./ListType.jsx";
import ParaType from "./ParaType.jsx";
import PreviewPdf from "../PreviewPdf.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import AddTaskIcon from "@mui/icons-material/AddTask";
import HeaderTemplate from "../Header.jsx";
import NavigationButtons from "../NavigationButtons.jsx";
import Button from "@mui/material/Button";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import NotesIcon from "@mui/icons-material/Notes";
import { useTheme } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CustomDiv = ({
  setSubmitClicked,
  setLogoutClicked,
  setLogoutUserType,
  setOverlayType,
}) => {
  const theme = useTheme();

  const { resumeData, updateField } = ResumeInputTemplate();

  const [hasChosenAStyle, setHasChosenAStyle] = useState(
    resumeData.customInput[0].title != "" ? true : false
  );

  const [renderedStyles, setRenderedStyles] = useState([]);

  useEffect(() => {
    const styles = resumeData.customInput
      .filter((exp) => exp.style !== "")
      .map((exp) => exp.style);
    setRenderedStyles(styles);
  }, [resumeData.customInput]);

  const addCustomInput = (styleType) => {
    let updatedStyles = [...renderedStyles];

    updatedStyles.push(styleType);

    setRenderedStyles(updatedStyles);

    const newEntry = {
      style: styleType,
      title: "",
      listValues: styleType === "ListType" ? [] : undefined,
      paraValues: styleType === "ParaType" ? "" : undefined,
    };

    const updatedCustomInput = hasChosenAStyle
      ? [...resumeData.customInput, newEntry]
      : [newEntry];

    setHasChosenAStyle(true);
    updateField("customInput", updatedCustomInput);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Custom Input"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={AddTaskIcon}
      />
      <Stack
        id="ContentWrapper"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          flexWrap: "wrap",
        }}
        flexDirection={{ xs: "column", md: "row" }}
      >
        <Box
          id="LeftContent"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
          width={{ xs: "90%", md: "50%" }}
        >
          <Box
            id="InputsWrapper"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <Box
              id="InputTypeOptions"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Button
                variant="contained"
                onClick={() => addCustomInput("ListType")}
                size="large"
                startIcon={<FormatListBulletedIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.black.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                List Type
              </Button>

              <Button
                variant="contained"
                onClick={() => addCustomInput("ParaType")}
                size="large"
                endIcon={<NotesIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.black.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Para Type
              </Button>
            </Box>

            {!hasChosenAStyle && (
              <Typography sx={{ margin: "15rem 1rem", textAlign: "center" }}>
                Please select an custom input type to begin.
              </Typography>
            )}

            {hasChosenAStyle && (
              <>
                {renderedStyles.includes("ListType") && (
                  <>
                    <Typography
                      sx={{
                        margin: "2rem 1rem",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      }}
                    >
                      --- List Type ---
                    </Typography>
                    <ListType />
                  </>
                )}

                {renderedStyles.includes("ParaType") && (
                  <>
                    <Typography
                      sx={{
                        margin: "2rem 1rem",
                        textAlign: "center",
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      }}
                    >
                      --- Para Type ---
                    </Typography>
                    <ParaType />
                  </>
                )}
              </>
            )}
          </Box>
          <NavigationButtons
            PreviousPageName={"Languages"}
            PreviousPageLink={`/resume-builder/languages-known`}
            NextPageName={"Download"}
            NextPageLink={""}
            setSubmitClicked={setSubmitClicked}
          />
        </Box>
        <PreviewPdf />
      </Stack>
    </>
  );
};

export default CustomDiv;
