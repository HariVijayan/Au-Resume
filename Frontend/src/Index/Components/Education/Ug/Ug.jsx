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
        <div>
         <h3>UG Details</h3>
         {resumeData.education[0].ug_degree.map((ug_degree, index) => (
         <div key={index} className="ug-entry">
            <div>
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
            <div>
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
            <div>
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
            <div>
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
            <div>
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
         <button type="button" onClick={(e) => handleAddEducation(e)}>Add UG</button>
        </div>
    );
};

export default Ug;
