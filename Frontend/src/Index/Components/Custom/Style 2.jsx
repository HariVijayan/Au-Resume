import React from "react";

const Style2 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomDivs = [...resumeData.customdiv];

    if (name === "customparatitle") {
      updatedCustomDivs[index].customtitle = value;
    } else if (name === "custompara") {
      updatedCustomDivs[index].customparagraph = value;
    }

    updatedCustomDivs[index] = { ...updatedCustomDivs[index], [name]: value };

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <>
      {resumeData.customdiv.map((div, index) => {
        if (div.customdivstyle2) {
          return (
            <div key={index} id="dv-CustomDivStyle2" className="SubWrapper">
              <div id="dv-CustomDivStyle2Title" className="InputWrapper">
                <label>Custom Title:</label>
                <input
                  type="text"
                  name="customtitle"
                  value={div.customtitle}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Title"
                />
              </div>
              <div id="dv-CustomDivStyle2Paragraph" className="InputWrapper">
                <label>Custom Paragraph:</label>
                <input
                  type="text"
                  name="customparagraph"
                  value={div.customparagraph}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Some Paragraph"
                />
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default Style2;
