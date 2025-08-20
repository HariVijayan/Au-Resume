import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmergencyIcon from "@mui/icons-material/Emergency";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckIcon from "@mui/icons-material/Check";
import ResumeInputTemplate from "../../../ResumeFormat.jsx";
import { useTheme } from "@mui/material";
import InputInfoDiv from "./InputInfoDiv.jsx";
import { useLocation } from "react-router-dom";
import {
  modifyCustomList,
  modifyCustomPara,
  modifySkillsList,
  modifySkillsPara,
  modifyCertificationsList,
  modifyCertificationsPara,
  modifyLanguagesList,
  modifyProjects,
} from "./InputMethods.js";

const UserInputs = ({
  inputType, //For all inputs
  inputLabel, //For all inputs
  requirement, //For all inputs
  explanation, //For all inputs
  examples, //For all inputs
  inputValue, //For all inputs
  inputOnchange, //For single time inputs that can be present once
  onChangeType, //For dynamic inputs that can have duplicate copies (Single time inputs will be having "Regular" value)
  onChangeEntry, //For dynamic inputs that can have duplicate copies
  textfieldName, //For dynamic inputs that can have duplicate copies
}) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const [showInputInfo, setShowInputInfo] = useState(false);
  const [isInputRequired, setIsInputRequired] = useState(false);

  const showInfoDiv = () => setShowInputInfo((show) => !show);
  const theme = useTheme();

  const location = useLocation();

  useEffect(() => {
    if (requirement === "Mandatory") {
      setIsInputRequired(true);
    } else {
      setIsInputRequired(false);
    }
  }, [location.pathname]);

  const updateDynamicInputs = (e) => {
    if (onChangeType === "CustomList") {
      modifyCustomList(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "CustomPara") {
      modifyCustomPara(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "SkillsList") {
      modifySkillsList(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "SkillsPara") {
      modifySkillsPara(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "CertificationsList") {
      modifyCertificationsList(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "CertificationsPara") {
      modifyCertificationsPara(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "Languages") {
      modifyLanguagesList(e, onChangeEntry, resumeData, updateField);
    }
    if (onChangeType === "Projects") {
      modifyProjects(e, onChangeEntry, resumeData, updateField);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {inputType === "text" && onChangeType === "Regular" && (
          <TextField
            required={isInputRequired}
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "email" && onChangeType === "Regular" && (
          <TextField
            required={isInputRequired}
            type="email"
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "url" && onChangeType === "Regular" && (
          <TextField
            required={isInputRequired}
            type="url"
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "textarea" && onChangeType === "Regular" && (
          <TextField
            required={isInputRequired}
            multiline
            maxRows={6}
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "text" && onChangeType != "Regular" && (
          <TextField
            required={isInputRequired}
            name={textfieldName}
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateDynamicInputs(e)}
          />
        )}

        {inputType === "url" && onChangeType != "Regular" && (
          <TextField
            required={isInputRequired}
            type="url"
            name={textfieldName}
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateDynamicInputs(e)}
          />
        )}

        {requirement === "Mandatory" && (
          <EmergencyIcon
            sx={{
              marginLeft: "2rem",
              color: theme.palette.error.main,
              cursor: "pointer",
            }}
            onClick={showInfoDiv}
          />
        )}

        {requirement === "Optional" && (
          <RemoveIcon
            sx={{
              marginLeft: "2rem",
              cursor: "pointer",
            }}
            onClick={showInfoDiv}
          />
        )}

        {requirement === "Recommended" && (
          <CheckIcon
            sx={{
              marginLeft: "2rem",
              color: theme.palette.success.main,
              cursor: "pointer",
            }}
            onClick={showInfoDiv}
          />
        )}
      </Box>

      {showInputInfo && (
        <InputInfoDiv
          requirement={requirement}
          examples={examples}
          explanation={explanation}
        />
      )}
    </>
  );
};

export default UserInputs;
