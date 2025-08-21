import { useState } from "react";
import PreviewPdf from "../../PreviewPdf.jsx";
import InfoDiv from "../../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../../ResumeFormat.jsx";
import HeaderTemplate from "../../Header.jsx";
import SchoolIcon from "@mui/icons-material/School";
import NavigationButtons from "../../NavigationButtons.jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useTheme } from "@mui/material";

import UserInputs from "../../UserInputs.jsx";

const Phd = ({ setLogoutClicked, setLogoutUserType, setOverlayType }) => {
  const { resumeData, updateField } = ResumeInputTemplate();
  const theme = useTheme();

  const [infoDiv, setInfoDiv] = useState("");

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const addNewPhd = (e) => {
    e.preventDefault();
    const updatedPhd = [...resumeData.education.phd];
    updatedPhd.push({
      name: "",
      university: "",
      year: "",
      expertise: "",
      additionalInfo: "",
    });
    updateField("education.phd", updatedPhd);
  };

  return (
    <>
      <HeaderTemplate
        currentPage={"Education - Ph. D"}
        setLogoutClicked={setLogoutClicked}
        setLogoutUserType={setLogoutUserType}
        setOverlayType={setOverlayType}
        PageIcon={SchoolIcon}
      />
      <div id="dv-MainFormAndPreview">
        <div id="dv-MainForm">
          <div id="dv-EducationPhdWrapper" className="WrapperClass">
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                variant="contained"
                onClick={addNewPhd}
                size="large"
                endIcon={<AddBoxIcon />}
                sx={{
                  margin: "2rem 0rem",
                  textTransform: "none",
                  backgroundColor: theme.palette.brown.main,
                }}
                padding={{ xs: "1rem 2rem", sm: "2rem 3rem" }}
              >
                Add Ph. D
              </Button>
            </Box>

            {resumeData.education.phd.map((newPhdEntry, newPhdIndex) => (
              <div
                key={newPhdIndex}
                id={`dv-EducationPhdCopy${newPhdIndex + 1}`}
                className="SubWrapper"
              >
                <UserInputs
                  inputType={"text"}
                  inputLabel={"Name"}
                  requirement={"Mandatory"}
                  explanation={"Complete name of the PhD with specialization"}
                  examples={"PhD in Advanced Neural Networks"}
                  inputValue={newPhdEntry.name}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"name"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"University"}
                  requirement={"Mandatory"}
                  explanation={"The university which awarded the PhD"}
                  examples={"Anna University"}
                  inputValue={newPhdEntry.university}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"university"}
                />

                <UserInputs
                  inputType={"yearStart"}
                  inputLabel={"Starting Period"}
                  requirement={"Mandatory"}
                  explanation={
                    "The starting year from which you started pursuing this phd"
                  }
                  examples={"May 2023"}
                  inputValue={newPhdEntry.startYear}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"startYear"}
                />

                <UserInputs
                  inputType={"yearEnd"}
                  inputLabel={"Ending Period"}
                  requirement={"Mandatory"}
                  explanation={
                    "The ending year from which you finished pursuing this phd"
                  }
                  examples={"May 2025"}
                  inputValue={newPhdEntry.endYear}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"endYear"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Specialization"}
                  requirement={"Mandatory"}
                  explanation={
                    "Domains in which you specialized on the PhD research"
                  }
                  examples={"Machine Learning, Deep Learning, Neural Networks"}
                  inputValue={newPhdEntry.specialization}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"specialization"}
                />

                <UserInputs
                  inputType={"text"}
                  inputLabel={"Additional Info"}
                  requirement={"Optional"}
                  explanation={
                    "Any other important and relevant information related to this degree"
                  }
                  examples={
                    "Widely accepted research with improved efficient algorithms"
                  }
                  inputValue={newPhdEntry.additionalInfo}
                  inputOnchange={""}
                  onChangeType={"Phd"}
                  onChangeEntry={newPhdIndex}
                  textfieldName={"additionalInfo"}
                />
              </div>
            ))}
          </div>
          <NavigationButtons
            PreviousPageName={"Experience"}
            PreviousPageLink={`/resume-builder/experience`}
            NextPageName={"Post Graduate"}
            NextPageLink={`/resume-builder/education/pg`}
          />
        </div>
        <PreviewPdf />
      </div>
    </>
  );
};

export default Phd;
