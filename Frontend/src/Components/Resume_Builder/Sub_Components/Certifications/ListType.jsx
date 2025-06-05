import { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const ListType = () => {
  const [infoDiv, setInfoDiv] = useState("");

  const { resumeData, updateField } = ResumeInputTemplate();

  const [certificationSetValue, setCertificationSetValue] = useState(
    resumeData.certifications.certificationSet || ""
  );

  const showOrHideInfoDiv = (currentState) => {
    if (infoDiv === currentState) {
      setInfoDiv(" ");
    } else {
      setInfoDiv(currentState);
    }
  };

  const splitCSValues = (e) => {
    let { value } = e.target;
    let updatedCertification = { ...resumeData.certifications };

    setCertificationSetValue(value);

    let newCertifications = value
      .split(",")
      .filter((certification) => certification.trim().length > 0);

    newCertifications = newCertifications.map((certification) =>
      certification.trim()
    );

    updatedCertification = {
      type: "ListType",
      certificationSet: newCertifications,
    };

    updateField("certifications", updatedCertification);
  };

  return (
    <div id="dv-CertificationListType" className="SubWrapper">
      <div
        id="dv-CertificationListTypeCertificationSet"
        className="InputWrapper"
      >
        <input
          type="text"
          id="in-rb_cer_list"
          name="certificationset"
          value={certificationSetValue}
          onChange={splitCSValues}
          placeholder=" "
        />
        <label htmlFor="in-rb_cer_list" className="TextFieldLabel">
          Certification List
        </label>
        <svg
          onClick={() => showOrHideInfoDiv("Certification")}
          xmlns="http://www.w3.org/2000/svg"
          className="MandatoryInputSvg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e3e3e3"
        >
          <path d="M440-120v-264L254-197l-57-57 187-186H120v-80h264L197-706l57-57 186 187v-264h80v264l186-187 57 57-187 186h264v80H576l187 186-57 57-186-187v264h-80Z" />
        </svg>
      </div>

      {infoDiv === "Certification" && (
        <InfoDiv
          requirement={"Mandatory"}
          explanation={"List of your certifications, separated by commas"}
          examples={
            "AWS Certified Developer, Google Cloud Certified (udemy.com/certificate/ghvsgv212)"
          }
          characterLimit={"Upto 120 characters"}
          allowedCharacters={"No Restrictions"}
        />
      )}
      {infoDiv === " " && (
        <InfoDiv
          requirement={""}
          explanation={""}
          examples={""}
          characterLimit={""}
          allowedCharacters={""}
        />
      )}
    </div>
  );
};

export default ListType;
