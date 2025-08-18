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

const UserInputs = ({
  inputType,
  inputLabel,
  requirement,
  explanation,
  examples,
  inputValue,
  inputOnchange,
}) => {
  const { updateField } = ResumeInputTemplate();
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
        {inputType === "text" && (
          <TextField
            required={isInputRequired}
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "email" && (
          <TextField
            required={isInputRequired}
            type="email"
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "url" && (
          <TextField
            required={isInputRequired}
            type="url"
            sx={{ width: "80%", margin: "1rem 0rem" }}
            value={inputValue}
            label={inputLabel}
            onChange={(e) => updateField(inputOnchange, e.target.value)}
          />
        )}

        {inputType === "textarea" && (
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
