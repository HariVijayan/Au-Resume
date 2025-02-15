import React from 'react';


const Ug = ({ resumeData, setResumeData }) => {
      const handleEducationInputChange = (e, Index) => {
        const { name, value } = e.target;
        const updatedEducation = [...resumeData.education];
        updatedEducation[0].ug_degree[Index][name] = value;
            
        setResumeData({
          ...resumeData,
          education: updatedEducation
        });
      };
    
      const handleAddEducation = (e) => {
        e.preventDefault(); 
        const updatedEducation = [...resumeData.education];
            updatedEducation[0].ug_degree.push({
              ug_degree_name: "",
              ug_degree_university: "",
              ug_degree_year: "",
              ug_degree_cgpa: "",
              ug_degree_additional_info: ""
              });
             
        setResumeData({
          ...resumeData,
          education: updatedEducation
        });
      };

    return (
        <div id="dv-EducationUgWrapper" className="WrapperClass">
         <div id="dv-EducationUgHeader" className="EducationHeader">
      <h3>Education Details - Ug</h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddEducationButton">
        Add Ug
      </button>
      </div>
         {resumeData.education[0].ug_degree.map((ug_degree, index) => (
         <div key={index} id="dv-EducationUg" className="SubWrapper">
            <div id="dv-EducationUgName" className="InputWrapper">
               <label>UG. Name:</label>
               <input
                  type="text"
                  name="ug_degree_name"
                  value={ug_degree.ug_degree_name}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="UG Name"
               required
               />
            </div>
            <div id="dv-EducationUgUniversity" className="InputWrapper">
               <label>UG University:</label>
               <input
                  type="text"
                  name="ug_degree_university"
                  value={ug_degree.ug_degree_university}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="University Name"
               required
               />
            </div>
            <div id="dv-EducationUgYear" className="InputWrapper">
               <label>Ug. Year:</label>
               <input
                  type="text"
                  name="ug_degree_year"
                  value={ug_degree.ug_degree_year}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="Year of Study"
               required
               />
            </div>
            <div id="dv-EducationUgCgpa" className="InputWrapper">
               <label>Ug CGPA:</label>
               <input
                  type="text"
                  name="ug_degree_cgpa"
                  value={ug_degree.ug_degree_cgpa}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="CGPA"
               required
               />
            </div>
            <div id="dv-EducationUgAdditionalInfo" className="InputWrapper">
               <label>Ug Additional Info:</label>
               <textarea
                  name="ug_additional_info"
                  value={ug_degree.ug_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="Additional Info"
               required
               />
            </div>
         </div>
         ))}
        </div>
    );
};

export default Ug;
