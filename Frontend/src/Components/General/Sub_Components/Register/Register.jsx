import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [department, setDept] = useState("Information Science and Technology");
  const [courseType, setCourseType] = useState("");
  const [programme, setProgramme] = useState("");
  const [branch, setBranch] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const navigate = useNavigate();

  const dropdownOptions = {
    courseTypes: ["Under Graduate", "Post Graduate"],
    programmes: {
      "Under Graduate": ["B.E./B.Tech.", "B.Arch."],
      "Post Graduate": [
        "M.C.A.",
        "M.E.",
        "M.Tech.",
        "M.Arch.",
        "M.Plan.",
        "M.Sc. (Five Years Integrated)",
        "M.Sc.",
        "M.B.A.",
      ],
    },
    braches: {
      "B.E./B.Tech.": [
        "Aeronautical Engineering",
        "Agriculture & Irrigation Engineering",
        "Apparel Technology",
        "Automobile Engineering",
        "Bio-Medical Engineering",
        "Ceramic Technology",
        "Chemical Engineering",
        "Civil Engineering",
        "Computer Science and Engineering",
        "Electrical and Electronics",
        "Electronics and Communication",
        "Electronics and Instrumentation",
        "Food Technology",
        "Geo Informatics",
        "Industrial Bio-Technology",
        "Industrial Engineering",
        "Information Technology",
        "Leather Technology",
        "Manufacturing Engineering",
        "Material Science and Engineering",
        "Mechanical Engineering",
        "Mining Engineering",
        "Pharmaceutical Technology",
        "Production Engineering",
        "Petroleum Engineering & Technology",
        "Rubber & Plastics Technology",
        "Textile Technology",
        "Printing & Packaging Technology",
        "Artificial Science & Data Science",
        "Robotics and Automation",
      ],
      "B.Arch.": ["Architecture"],
      "M.C.A.": ["N/A"],
      "M.E.": [
        "Hydrology and Water Ress. Engineering",
        "Soil Mechs and Foundn. Engineering",
        "Structural Engineering",
        "Construction Engineering and Management",
        "Remote Sensing and Geomatics",
        "Transportation Engineering",
        "Environmental Engineering",
        "Irrigation Water Management",
        "Environmental Management",
        "Internal Combustion Engineering",
        "Thermal Engineering",
        "Energy Engineering",
        "Computer Integrated Manufacturing",
        "Industrial Engineering",
        "Manufacturing Systems and Mgmt.",
        "Solar Energy",
        "Quality Engineering and Mgmt.",
        "Aeronautical Engineering",
        "Avionics",
        "Aerospace",
        "Automobile Engineering",
        "Manufacturing Engineering",
        "Mechatronics",
        "Applied Electronics",
        "Biomedical Engineering",
        "Medical Electronics",
        "Communication Systems",
        "V.L.S.I Design",
        "Communication and Networking",
        "Wireless Technology",
        "VLSI and Embedded Systems",
        "Computer Science and Engineering",
        "Big Data Analytics",
        "Software Engineering",
        "Operation Research",
        "Multi Media Technology",
        "Information Technology",
        "Design Engineering",
        "Mobility Engineering",
        "Product Design and Development",
        "Printing and Packaging Technology",
        "Instrumentation Engg. Spcl in Industrial Automation",
        "High Voltage Engineering",
        "Power Systems Engineering",
        "Power Electronics and Drives",
        "Power Engineering and Management",
        "Control and Instrumentation Engineering",
        "Embedded Systems and Technologies",
      ],
      "M.Tech.": [
        "Environmental Science and Tech.",
        "Laser & Electro-Optical Engg.",
        "Polymer Science and Engg.",
        "Chemical Engineering",
        "Ceramic Technology",
        "Petroleum Refining and Petro-Chemical",
        "Bio-Technology",
        "Bio-Pharmaceutical Technology",
        "Food Technology",
        "Textile Technology",
        "Leather Technology",
        "Footwear Science and Engineering",
        "Nano Science and Technology",
        "Industrial Safety and Hazard Management",
        "Rubber Technology",
        "Computational Biology",
        "Information Technology",
        "Information Technology spcl in AI and Data Science",
        "Ocean Technology",
      ],
      "M.Arch.": ["Landscape Architecture", "Digital Architecture", "General"],
      "M.Plan.": ["Town and Country Planning"],
      "M.Sc. (Five Years Integrated)": [
        "Computer Science",
        "Information Technology",
        "Electronic Media",
      ],
      "M.Sc.": [
        "Mathematics",
        "Material Science",
        "Medical Physics",
        "Applied Chemistry",
        "Applied Geology",
        "Environmental Science",
        "Electronics Media",
        "Multimedia",
        "Multimedia spcl in Viscom",
      ],
      "M.B.A.": ["General Management", "Tourism Management"],
    },
  };

  const getProgrammesList = () => {
    return dropdownOptions.programmes[courseType] || [];
  };

  const getBranchesList = () => {
    return dropdownOptions.braches[programme] || [];
  };

  const chooseCourseType = (e) => {
    setCourseType(e.target.value);
    setProgramme("");
    setBranch("");
  };

  const chooseProgramme = (e) => {
    setProgramme(e.target.value);
    setBranch("");
  };

  const chooseBranch = (e) => {
    setBranch(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }
    if (!courseType) {
      setMessage("Choose your course type to continue.");
      return;
    }
    if (!programme) {
      setMessage("Select your programme to continue.");
      return;
    }
    if (!branch) {
      setMessage("Select your branch to continue.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/createUser/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            registerNumber,
            department,
            courseType,
            programme,
            branch,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        // Redirect to OTP verification page
        navigate("/verify-otp", { state: { email } });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Registration failed");
    }
  };

  return (
    <div id="dv-RegisterWrapper">
      <h2>Register</h2>

      <div className="RegistrationDivWrapper">
        <div id="dv-RegisterEmail" className="RegisterInputWrapper">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="in-register_email" className="TextFieldLabel">
            Email
          </label>
        </div>

        <div id="dv-RegisterStudentNo" className="RegisterInputWrapper">
          <input
            type="number"
            placeholder=" "
            value={registerNumber}
            onChange={(e) => setRegisterNumber(e.target.value)}
            required
          />
          <label htmlFor="in-register_studentno" className="TextFieldLabel">
            Register Number
          </label>
        </div>
      </div>

      <div className="RegistrationDivWrapper">
        <div id="dv-RegisterDept" className="RegisterDropDown">
          <select
            value={department}
            id="se-Department"
            onChange={(e) => setDept(e.target.value)}
          >
            <option value="Information Science and Technology">
              Information Science and Technology
            </option>
            <option value="Biomedical Engineering">
              Biomedical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Computer Science and Engineering">
              Computer Science and Engineering
            </option>
            <option value="Chemistry">
              Electrical and Electronics Engineering
            </option>
            <option value="Electronics and Communication Engineering">
              Electronics and Communication Engineering
            </option>
            <option value="English">English</option>
            <option value="Geology">Geology</option>
            <option value="Industrial Engineering">
              Industrial Engineering
            </option>
            <option value="Mathematics">Mathematics</option>
            <option value="Manufacturing Engineering">
              Manufacturing Engineering
            </option>
            <option value="Management Studies">Management Studies</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Media Sciences">Media Sciences</option>
            <option value="Medical Physics">Medical Physics</option>
            <option value="Mining Engineering">Mining Engineering</option>
            <option value="Physics">Physics</option>
            <option value="Printing and Packaging Technology">
              Priniting and Packaging Technology
            </option>
          </select>
          <label htmlFor="se-Department" className="DropDownLabel">
            Department
          </label>
        </div>

        <div id="dv-RegisterCourse" className="RegisterDropDown">
          <select
            value={courseType}
            id="se-CourseType"
            onChange={chooseCourseType}
          >
            <option value="">Choose course type</option>
            {dropdownOptions.courseTypes.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="se-CourseType" className="DropDownLabel">
            Course Type
          </label>
        </div>
      </div>

      <div className="RegistrationDivWrapper">
        <div id="dv-RegisterProgramme" className="RegisterDropDown">
          <select
            value={programme}
            id="se-Programme"
            onChange={chooseProgramme}
            disabled={!courseType}
          >
            <option value="">Choose Programme</option>
            {getProgrammesList().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="se-Programme" className="DropDownLabel">
            Programme
          </label>
        </div>

        <div id="dv-RegisterBranch" className="RegisterDropDown">
          <select
            value={branch}
            id="se-Branch"
            onChange={chooseBranch}
            disabled={!programme}
          >
            <option value="">Choose Branch</option>
            {getBranchesList().map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="se-Branch" className="DropDownLabel">
            Branch
          </label>
        </div>
      </div>

      <div className="RegistrationDivWrapper">
        <div id="dv-RegisterPassword" className="RegisterInputWrapper">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="in-register_password" className="TextFieldLabel">
            Password
          </label>
        </div>

        <div id="dv-RegisterConfirmPassword" className="RegisterInputWrapper">
          <input
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label
            htmlFor="in-register_confirmpassword"
            className="TextFieldLabel"
          >
            Confirm Password
          </label>
        </div>
      </div>

      <button onClick={handleRegister} disabled={!branch}>
        Register
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
