import React from "react";

const Language = ({ resumeData, setResumeData }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let updatedLanguages = { ...resumeData.languages };
        
        updatedLanguages = value.split(",").map(role => role.trim());
    
        setResumeData({
          ...resumeData,
          languages: updatedLanguages,
        });
      };

  return (
    <div id="dv-LanguagesWrapper" className="WrapperClass">
      <div id="dv-LanguagesHeader" className="LanguagesHeader">
      <h3>Languages Known</h3>
      </div>
      <div id="dv-LanguagesSet" className="InputWrapper">
        <label>Languages:</label>
        <input
          type="text"
          name="languages"
          value={resumeData.languages.join(", ")}
          onChange={(e) => handleInputChange(e)}
          placeholder="Tamil, English"
          required
        />
      </div>
    </div>
  );
};

export default Language;
