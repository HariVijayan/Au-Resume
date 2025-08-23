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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import {
  modifyExpList,
  modifyExpPara,
  modifyExpYear,
  modifyCustomList,
  modifyCustomPara,
  modifySkillsList,
  modifySkillsPara,
  modifyCertificationsList,
  modifyCertificationsPara,
  modifyLanguagesList,
  modifyProjects,
  modifyPhd,
  modifyPhdYear,
  modifyPg,
  modifyPgYear,
  modifyUg,
  modifyUgYear,
  modifyDiploma,
  modifyDiplomaYear,
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

  const [monthYearInput, setMonthYearInput] = useState(null);

  const [yearInput, setYearInput] = useState(null);

  const updateDynamicInputs = (e) => {
    if (onChangeType === "ExpList") {
      if (inputType === "monthYearStart" || inputType === "monthYearEnd") {
        modifyExpYear(textfieldName, e, onChangeEntry, resumeData, updateField);
        return;
      } else {
        modifyExpList(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }
    if (onChangeType === "ExpPara") {
      if (inputType === "monthYearStart" || inputType === "monthYearEnd") {
        modifyExpYear(textfieldName, e, onChangeEntry, resumeData, updateField);
        return;
      } else {
        modifyExpPara(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }

    if (onChangeType === "CustomList") {
      modifyCustomList(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "CustomPara") {
      modifyCustomPara(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "SkillsList") {
      modifySkillsList(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "SkillsPara") {
      modifySkillsPara(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "CertificationsList") {
      modifyCertificationsList(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "CertificationsPara") {
      modifyCertificationsPara(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "Languages") {
      modifyLanguagesList(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "Projects") {
      modifyProjects(e, onChangeEntry, resumeData, updateField);
      return;
    }
    if (onChangeType === "Phd") {
      if (inputType === "yearStart" || inputType === "yearEnd") {
        modifyPhdYear(textfieldName, e, onChangeEntry, resumeData, updateField);
        return;
      } else {
        modifyPhd(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }
    if (onChangeType === "Pg") {
      if (inputType === "yearStart" || inputType === "yearEnd") {
        modifyPgYear(textfieldName, e, onChangeEntry, resumeData, updateField);
        return;
      } else {
        modifyPg(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }
    if (onChangeType === "Ug") {
      if (inputType === "yearStart" || inputType === "yearEnd") {
        modifyUgYear(textfieldName, e, onChangeEntry, resumeData, updateField);
        return;
      } else {
        modifyUg(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }
    if (onChangeType === "Diploma") {
      if (inputType === "yearStart" || inputType === "yearEnd") {
        modifyDiplomaYear(
          textfieldName,
          e,
          onChangeEntry,
          resumeData,
          updateField
        );
        return;
      } else {
        modifyDiploma(e, onChangeEntry, resumeData, updateField);
        return;
      }
    }
  };

  return (
    <>
      <Box
        id={inputLabel}
        sx={{
          display: "flex",
          justifyContent: "center",
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

        {inputType === "monthYearStart" && onChangeType != "Regular" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              label={inputLabel}
              value={monthYearInput}
              onChange={(newValue) => {
                setMonthYearInput(newValue);
                const formatted = newValue ? format(newValue, "MMM yyyy") : "";
                updateDynamicInputs(formatted);
              }}
              sx={{ margin: "1rem 0rem", width: "80%" }}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
        )}

        {inputType === "monthYearEnd" && onChangeType != "Regular" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              label={inputLabel}
              value={monthYearInput}
              onChange={(newValue) => {
                setMonthYearInput(newValue);
                const formatted = newValue ? format(newValue, "MMM yyyy") : "";
                updateDynamicInputs(formatted);
              }}
              sx={{ margin: "1rem 0rem", width: "80%" }}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
        )}

        {inputType === "yearStart" && onChangeType != "Regular" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label={inputLabel}
              value={yearInput}
              onChange={(newValue) => {
                setYearInput(newValue);
                const formatted = newValue ? format(newValue, "yyyy") : "";
                updateDynamicInputs(formatted);
              }}
              sx={{ margin: "1rem 0rem", width: "80%" }}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
        )}

        {inputType === "yearEnd" && onChangeType != "Regular" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label={inputLabel}
              value={yearInput}
              onChange={(newValue) => {
                setYearInput(newValue);
                const formatted = newValue ? format(newValue, "yyyy") : "";
                updateDynamicInputs(formatted);
              }}
              sx={{ margin: "1rem 0rem", width: "80%" }}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </LocalizationProvider>
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
