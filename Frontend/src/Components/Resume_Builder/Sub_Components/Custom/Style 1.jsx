import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomDivs = [...resumeData.customdiv];

    if (name === "customlistvalue") {
      updatedCustomDivs[index].customlist = value
        .split(",")
        .map((role) => role.trim());

      const { customlistvalue, ...restOfDiv } = updatedCustomDivs[index];
      updatedCustomDivs[index] = restOfDiv;
    } else if (name === "customtitle") {
      updatedCustomDivs[index].customtitle = value;
    } else {
      updatedCustomDivs[index] = { ...updatedCustomDivs[index], [name]: value };
    }
    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <>
      {resumeData.customdiv.map((div, index) => {
        if (div.customdivstyle1) {
          return (
            <div key={index} id="dv-CustomDivStyle1" className="SubWrapper">
              <div id="dv-CustomDivStyle1Title" className="InputWrapper">
                <input
                  type="text"
                  name="customtitle"
                  id="in-rb_cusdiv_title"
                  value={div.customtitle}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_cusdiv_title" className="TextFieldLabel">
                  Custom Title
                </label>
              </div>
              <div id="dv-CustomDivStyle1List" className="InputWrapper">
                <input
                  type="text"
                  name="customlistvalue"
                  id="in-rb_cusdiv_list"
                  value={div.customlist.join(", ")}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder=" "
                />
                <label htmlFor="in-rb_cusdiv_list" className="TextFieldLabel">
                  Custom List
                </label>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default Style1;
