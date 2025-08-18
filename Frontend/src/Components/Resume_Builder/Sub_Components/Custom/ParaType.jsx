import { useState } from "react";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputInfoDiv from "../InputInfoDiv.jsx";
import EmergencyIcon from "@mui/icons-material/Emergency";
import { useTheme } from "@mui/material";

const ParaType = () => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const modifyCustomInput = (e, customInputIndex) => {
    const { name, value } = e.target;
    const updatedCustomInput = [...resumeData.customInput];

    updatedCustomInput[customInputIndex][name] = value;

    updateField("customInput", updatedCustomInput);
  };

  const [showTitleInfo, setShowTitleInfo] = useState(false);

  const [showListInfo, setShowListInfo] = useState(false);

  return (
    <>
      {resumeData.customInput.map(
        (customInputEntry, customInputIndex) =>
          customInputEntry.style === "ParaType" && (
            <div
              key={customInputIndex}
              id={`dv-CustomParaCopy${customInputIndex + 1}`}
              className="SubWrapper"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  required
                  name="title"
                  sx={{ width: "80%", margin: "1rem 0rem" }}
                  value={customInputEntry.title}
                  onChange={(e) => modifyCustomInput(e, customInputIndex)}
                  label="Custom Title"
                />

                <EmergencyIcon
                  sx={{
                    marginLeft: "2rem",
                    color: theme.palette.error.main,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowTitleInfo((show) => !show)}
                />
              </Box>

              {showTitleInfo && (
                <InputInfoDiv
                  requirement={"Mandatory"}
                  examples={"Extra Curricular Activities"}
                  explanation={"Provide a title for the custom section"}
                />
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  width: "100%",
                  flexWrap: "wrap",
                }}
              >
                <TextField
                  required
                  name="paraValues"
                  sx={{ width: "80%", margin: "1rem 0rem" }}
                  value={customInputEntry.paraValues}
                  onChange={(e) => modifyCustomInput(e, customInputIndex)}
                  label="Custom Paragraph"
                />

                <EmergencyIcon
                  sx={{
                    marginLeft: "2rem",
                    color: theme.palette.error.main,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowListInfo((show) => !show)}
                />
              </Box>

              {showListInfo && (
                <InputInfoDiv
                  requirement={"Mandatory"}
                  examples={
                    "High School Football team captain. Part of Bharat Scouts"
                  }
                  explanation={"Your custom paragraph"}
                />
              )}
            </div>
          )
      )}
    </>
  );
};

export default ParaType;
