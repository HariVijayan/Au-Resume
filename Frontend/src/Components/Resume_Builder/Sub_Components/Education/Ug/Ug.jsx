import React from 'react';
import PreviewPdf from '../../PreviewPdf.jsx';
import { useNavigate } from 'react-router-dom';


const Ug = ({ resumeData, setResumeData, templateType }) => {
   const navigate = useNavigate();
       
         const changeContent = (navigationType) => {
           if(navigationType==="previous"){
             navigate('/resume-builder/education/pg');
           }else{
             navigate('/resume-builder/education/diploma');
           }
         };
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
      <div id="dv-MainFormAndPreview">
         <div id="dv-MainForm">
        <div id="dv-EducationUgWrapper" className="WrapperClass">
         <div id="dv-EducationUgHeader" className="EducationHeader">
      <h3>Education Details - Ug<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z"/></svg></h3>
      <button type="button" onClick={(e) => handleAddEducation(e)} className="AddInputButtons">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg> Add Ug
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
               />
            </div>
            <div id="dv-EducationUgAdditionalInfo" className="InputWrapper">
               <label>Ug Additional Info:</label>
               <textarea
                  name="ug_additional_info"
                  value={ug_degree.ug_additional_info}
                  onChange={(e) => handleEducationInputChange(e, index)}
               placeholder="Additional Info"
               />
            </div>
         </div>
         ))}
        </div>
        <div id="dv-EducationUgButtons" className="NavigationButtons">
            <button type="button" onClick={() => changeContent("previous")} className="LeftNavigationButtons">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/></svg> Post Graduate
            </button>
            <button type="button" onClick={() => changeContent("next")} className="RightNavigationButtons">
              Diploma <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M383-480 200-664l56-56 240 240-240 240-56-56 183-184Zm264 0L464-664l56-56 240 240-240 240-56-56 183-184Z"/></svg>
            </button>
          </div>
          </div>
          <PreviewPdf resumeData={resumeData} templateType={templateType}/>
        </div>
    );
};

export default Ug;
