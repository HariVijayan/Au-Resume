const App = () => {
    const [formData, setFormData] = useState({
      username: "",
      small_bio: "",
      phone_number: "",
      emailid: "",
      location: "",
      linkedin: "",
      linkedinurl: "",
      github: "",
      githuburl: "",
      customlink: "",
      customlinkurl: "",
      summary: "",
      education: [],
      skills: { style: null, skillset: [] },
      projects: [],
      experience: [],
      certifications: { style: null, certificationset: [] },
      languages: [],
      customdiv: [],
    });
  
    const [selectedSkillStyle, setSelectedSkillStyle] = useState(null);
    const [selectedCertificationStyle, setSelectedCertificationStyle] = useState(null);
    const [selectedCustomDivStyle, setSelectedCustomDivStyle] = useState(null);
  
    const addDynamicField = (field) => {
      const newEntry = {};
      switch (field) {
        case "education":
          newEntry.ug_degree_name = "";
          newEntry.ug_degree_university = "";
          newEntry.ug_degree_year = "";
          newEntry.ug_degree_cgpa = "";
          break;
        case "projects":
          newEntry.project_name = "";
          newEntry.project_link = "";
          newEntry.project_description = "";
          newEntry.project_tech = "";
          break;
        case "experience":
          newEntry.experience_company = "";
          newEntry.experience_location = "";
          newEntry.experience_year = "";
          newEntry.experience_designation = "";
          newEntry.experience_roles = [];
          break;
        case "customdiv":
          if (!selectedCustomDivStyle) {
            alert("Choose a style for CustomDiv first!");
            return;
          }
          newEntry.customtitle = "";
          newEntry[selectedCustomDivStyle] = true;
          newEntry[selectedCustomDivStyle === "customdivstyle1" ? "customlist" : "customparagraph"] = "";
          break;
        default:
          return;
      }
      setFormData({ ...formData, [field]: [...formData[field], newEntry] });
    };
  
    const handleInputChange = (e, field, index = null, subField = null) => {
      const { name, value } = e.target;
  
      if (index !== null) {
        const updatedArray = [...formData[field]];
        if (subField) {
          updatedArray[index][subField] = value;
        } else {
          updatedArray[index][name] = value;
        }
        setFormData({ ...formData, [field]: updatedArray });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Final Data:", JSON.stringify(formData, null, 2));
    };
  
    return (
      <div className="container">
        <h2>Profile Form</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleInputChange} />
  
          <label>Bio:</label>
          <input type="text" name="small_bio" onChange={handleInputChange} />
  
          <label>Phone Number:</label>
          <input type="text" name="phone_number" onChange={handleInputChange} />
  
          <label>Email:</label>
          <input type="email" name="emailid" onChange={handleInputChange} />
  
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Degree Name"
                value={edu.ug_degree_name}
                onChange={(e) => handleInputChange(e, "education", index, "ug_degree_name")}
              />
            </div>
          ))}
          <button type="button" onClick={() => addDynamicField("education")}>
            Add Education
          </button>
  
          <h3>Skills</h3>
          <select onChange={(e) => setSelectedSkillStyle(e.target.value)}>
            <option value="">Select Style</option>
            <option value="skillstyle1">List</option>
            <option value="skillstyle2">Comma Separated</option>
          </select>
          {selectedSkillStyle && (
            <input
              type="text"
              placeholder="Enter skills"
              onChange={(e) =>
                setFormData({ ...formData, skills: { style: selectedSkillStyle, skillset: e.target.value } })
              }
            />
          )}
  
          <h3>Projects</h3>
          {formData.projects.map((project, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Project Name"
                value={project.project_name}
                onChange={(e) => handleInputChange(e, "projects", index, "project_name")}
              />
            </div>
          ))}
          <button type="button" onClick={() => addDynamicField("projects")}>
            Add Project
          </button>
  
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Company"
                value={exp.experience_company}
                onChange={(e) => handleInputChange(e, "experience", index, "experience_company")}
              />
            </div>
          ))}
          <button type="button" onClick={() => addDynamicField("experience")}>
            Add Experience
          </button>
  
          <h3>Certifications</h3>
          <select onChange={(e) => setSelectedCertificationStyle(e.target.value)}>
            <option value="">Select Style</option>
            <option value="certificationstyle1">List</option>
            <option value="certificationstyle2">Comma Separated</option>
          </select>
          {selectedCertificationStyle && (
            <input
              type="text"
              placeholder="Enter Certifications"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certifications: { style: selectedCertificationStyle, certificationset: e.target.value },
                })
              }
            />
          )}
  
          <h3>Custom Section</h3>
          <select onChange={(e) => setSelectedCustomDivStyle(e.target.value)}>
            <option value="">Select Style</option>
            <option value="customdivstyle1">List</option>
            <option value="customdivstyle2">Paragraph</option>
          </select>
          <button type="button" onClick={() => addDynamicField("customdiv")}>
            Add Custom Section
          </button>
  
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  
  export default GeneratePDF;
  