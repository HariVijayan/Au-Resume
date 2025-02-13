import React from "react";

const Style1 = ({ resumeData, setResumeData }) => {
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCustomDivs = [...resumeData.customdiv];

    if (name === "customlistvalue") {
      updatedCustomDivs[index].customlist = value.split(",").map(role => role.trim());
    } else if (name === "customlisttitle") {
      updatedCustomDivs[index].customtitle = value;
    }

    updatedCustomDivs[index] = { ...updatedCustomDivs[index], [name]: value };

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  const handleAddCustomDiv = (e) => {
    e.preventDefault();
    const updatedCustomDivs = [...resumeData.customdiv];
    updatedCustomDivs.push({
      customtitle: "",
      customdivstyle1: true,
      customlist: [""],
    });

    setResumeData({
      ...resumeData,
      customdiv: updatedCustomDivs,
    });
  };

  return (
    <div>
      <h3>Custom Div - Style 1</h3>
      {resumeData.customdiv.map((div, index) => {
        if (div.customdivstyle1) {
          return (
            <div key={index} id={`style-1-${index}`}>
              <div>
                <label>Custom List Title:</label>
                <input
                  type="text"
                  name="customlisttitle"
                  value={div.customtitle}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Comma Separated Values"
                  required
                />
              </div>
              <div>
                <label>Custom List Values:</label>
                <input
                  type="text"
                  name="customlistvalue"
                  value={div.customlist.join(", ")}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Comma Separated Values"
                  required
                />
              </div>
            </div>
          );
        }
        return null;
      })}
      <button type="button" onClick={handleAddCustomDiv}>
        Add Custom Div
      </button>
    </div>
  );
};

export default Style1;
