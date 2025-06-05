import { useState } from "react";
import InfoDiv from "../Info Div/InfoDiv.jsx";
import ResumeInputTemplate from "../../../../ResumeFormat.jsx";

const ParaType = () => {
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

  const trimParaWhitespaces = (e) => {
    const { value } = e.target;

    let updatedCertification = { ...resumeData.certifications };

    let newCertifications = value.trim();

    setCertificationSetValue(value);

    updatedCertification = {
      type: "ParaType",
      certificationSet: newCertifications,
    };

    updateField("certifications", updatedCertification);
  };

  return (
    <div id="dv-CertificationParaType" className="SubWrapper">
      <div
        id="dv-CertificationParaTypeCertificationSet"
        className="InputWrapper"
      >
        <input
          type="text"
          id="in-rb_cer_para"
          name="certificationset"
          value={certificationSetValue}
          onChange={trimParaWhitespaces}
          placeholder=" "
        />
        <label htmlFor="in-rb_cer_para" className="TextFieldLabel">
          Certification Para
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
          explanation={"Your personal certifications as a paragraph"}
          examples={
            "I have completed certifications in Web Development, Cloud Computing, and Machine Learning"
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

export default ParaType;
