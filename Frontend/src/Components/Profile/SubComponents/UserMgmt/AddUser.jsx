import { useEffect, useState } from "react";
import axios from "axios";

const AddNewUser = () => {
  const requestType = "addNewUser";

  const [usersList, setUsersList] = useState([]);
  const [newAdditionType, setNewAdditionType] = useState("");

  const [showUsers, setShowUsers] = useState(false);
  const [approval, setApproval] = useState(false);
  const [needApprovalSingle, setNeedApprovalSingle] = useState(null);
  const [needApprovalMul, setNeedApprovalMul] = useState(null);

  const [showOtp, setShowOtp] = useState(null);
  const [otpReqMessage, setOtpReqMessage] = useState("");
  const [otpReqMessageColor, setOtpReqMessageColor] = useState("red");
  const [otpInput, setOtpInput] = useState("");

  const [addUserMessage, setAddUserMessage] = useState("");
  const [addUserMessageColor, setAddUserMessageColor] = useState("red");

  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserDept, setNewUserDept] = useState(
    "Information Science and Technology"
  );
  const [newUserCourseType, setNewUserCourseType] = useState("");
  const [newUserProgramme, setNewUserProgramme] = useState("");
  const [newUserBranch, setNewUserBranch] = useState("");
  const [newUserRegNo, setNewUserRegNo] = useState("");

  const [commonEmailSuffix, setCommonEmailSuffix] = useState(
    "@student.annauniv.edu"
  );
  const [commonRegNoPrefix, setCommonRegNoPrefix] = useState("");
  const [commonUserDept, setCommonUserDept] = useState(
    "Information Science and Technology"
  );
  const [commonUserCourseType, setCommonUserCourseType] = useState("");
  const [commonUserProgramme, setCommonUserProgramme] = useState("");
  const [commonUserBranch, setCommonUserBranch] = useState("");
  const [commonRegNoStart, setCommonRegNoStart] = useState("");
  const [commonRegNoEnd, setCommonRegNoEnd] = useState("");
  const [skipRegNo, setSkipRegNoEnd] = useState("");

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
    branches: {
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

  const getProgrammesList = (actionType) => {
    if (actionType === "Single") {
      return dropdownOptions.programmes[newUserCourseType] || [];
    }
    if (actionType === "Multiple") {
      return dropdownOptions.programmes[commonUserCourseType] || [];
    }
  };

  const getBranchesList = (actionType) => {
    if (actionType === "Single") {
      return dropdownOptions.branches[newUserProgramme] || [];
    }
    if (actionType === "Multiple") {
      return dropdownOptions.branches[commonUserProgramme] || [];
    }
  };

  const chooseCourseType = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserCourseType(e);
      setNewUserProgramme("");
      setNewUserBranch("");
    }
    if (actionType === "Multiple") {
      setCommonUserCourseType(e);
      setCommonUserProgramme("");
      setCommonUserBranch("");
    }
  };

  const chooseProgramme = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserProgramme(e);
      setNewUserBranch("");
    }
    if (actionType === "Multiple") {
      setCommonUserProgramme(e);
      setCommonUserBranch("");
    }
  };

  const chooseBranch = (e, actionType) => {
    if (actionType === "Single") {
      setNewUserBranch(e);
    }
    if (actionType === "Multiple") {
      setCommonUserBranch(e);
    }
  };

  useEffect(() => {
    if (
      newAdditionType === "Multiple" &&
      commonEmailSuffix &&
      commonRegNoPrefix &&
      commonRegNoStart &&
      commonRegNoEnd &&
      commonUserDept &&
      commonUserCourseType &&
      commonUserProgramme &&
      commonUserBranch
    ) {
      setNeedApprovalSingle(false);
      setNeedApprovalMul(true);
      getFinalUserList();
    }
    if (
      newAdditionType === "Single" &&
      newUserEmail &&
      newUserRegNo &&
      newUserDept &&
      newUserCourseType &&
      newUserProgramme &&
      newUserBranch
    ) {
      setNeedApprovalMul(false);
      setNeedApprovalSingle(true);
      getFinalUserList();
    } else if (newAdditionType != "Single" && newAdditionType != "Multiple") {
      setShowUsers(false);
      setNeedApprovalSingle(false);
      setNeedApprovalMul(false);
    }
  }, [
    commonEmailSuffix,
    commonRegNoPrefix,
    commonRegNoStart,
    commonRegNoEnd,
    commonUserDept,
    commonUserCourseType,
    commonUserProgramme,
    commonUserBranch,
    newUserEmail,
    newUserRegNo,
    newUserDept,
    newUserCourseType,
    newUserProgramme,
    newUserBranch,
  ]);

  const modifyAddUserOperation = (newOperationType) => {
    if (newOperationType === "Single") {
      setCommonEmailSuffix("@student.annauniv.edu");
      setCommonRegNoPrefix("");
      setCommonRegNoStart("");
      setCommonRegNoEnd("");
      setCommonUserDept("Information Science and Technology");
      setCommonUserCourseType("");
      setCommonUserProgramme("");
      setCommonUserBranch("");
      setNewAdditionType("Single");
    }
    if (newOperationType === "Multiple") {
      setNewUserEmail("");
      setNewUserRegNo("");
      setNewUserDept("Information Science and Technology");
      setNewUserCourseType("");
      setNewUserProgramme("");
      setNewUserBranch("");
      setNewAdditionType("Multiple");
    }
  };

  const getFinalUserList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/userMgmt/addUser/get-final-users",
        {
          newAdditionType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          commonUserDept,
          commonUserCourseType,
          commonUserProgramme,
          commonUserBranch,
          newUserEmail,
          newUserRegNo,
          newUserDept,
          newUserCourseType,
          newUserProgramme,
          newUserBranch,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUsersList(response.data.usersList);
        setShowUsers(true);
      }
    } catch (error) {
      console.error(error.response.data.message || "Failed to fetch user list");
    }
  };

  const getVerificationOtp = async () => {
    if (newAdditionType === "Multiple") {
      if (parseInt(commonRegNoEnd) - parseInt(commonRegNoStart) > 100) {
        setOtpReqMessageColor("red");
        setOtpReqMessage(
          "You can only add upto 100 users at a time. Please reduce the user range and complete in multiple requests if needed."
        );
        return;
      }
      if (parseInt(commonRegNoEnd) < parseInt(commonRegNoStart)) {
        setOtpReqMessageColor("red");
        setOtpReqMessage(
          "The end register number cannot be less than the start register number. Please correct the range."
        );
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/approvals/get-approval-otp",
        { requestType },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setShowOtp(true);
        setOtpReqMessage(
          "An OTP has been sent to your email. Verify to proceed with the request"
        );
        setOtpReqMessageColor("green");
      }
    } catch (error) {
      setOtpReqMessageColor("red");
      setOtpReqMessage(error.response.data.message || "Failed to get OTP");
    }
  };

  const addUserToDB = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/actions/userMgmt/newUser/addNewUser",
        {
          newAdditionType,
          commonEmailSuffix,
          commonRegNoPrefix,
          commonRegNoStart,
          commonRegNoEnd,
          skipRegNo,
          commonUserDept,
          commonUserCourseType,
          commonUserProgramme,
          commonUserBranch,
          newUserEmail,
          newUserRegNo,
          newUserDept,
          newUserCourseType,
          newUserProgramme,
          newUserBranch,
          otpInput,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setAddUserMessage(
          `New user(s) have been added to the site successfully. Refreshing the page in 5 seconds.`
        );
        setAddUserMessageColor("green");
        setTimeout(() => {
          window.location.reload(false); // This will trigger a page reload after 5 seconds delay
        }, 5000);
      }
    } catch (error) {
      setAddUserMessageColor("red");
      setAddUserMessage(
        `${error.response?.data?.message} Refreshing the page in 5 seconds. Please try again.` ||
          "Failed to add new user(s). Refreshing the page in 5 seconds. Please try again."
      );
      setTimeout(() => {
        window.location.reload(false); // This will trigger a page reload after 5 seconds delay
      }, 5000);
    }
  };

  return (
    <>
      <div className="AdminMgmtWrapper">
        <p className="AdminMgmtActionHeading">Add New Users</p>
        <span>
          (Cross verify each user's details [email, register number]
          individually before adding them as new users)
        </span>
        <div className="UserMgmtButtons">
          <button
            className="LeftNavigationButtons"
            onClick={() => modifyAddUserOperation("Single")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
            Single User
          </button>
          <button
            className="RightNavigationButtons"
            onClick={() => modifyAddUserOperation("Multiple")}
          >
            Multiple Users
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
            </svg>
          </button>
        </div>
        {newAdditionType === "Single" && (
          <div className="AddSingleUserWrapper">
            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="email"
                  placeholder=" "
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_email"
                  className="RegisterTextFieldLabel"
                >
                  Email
                </label>
              </div>

              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={newUserRegNo}
                  onChange={(e) => setNewUserRegNo(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Register Number
                </label>
              </div>
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={newUserDept}
                    id="se-Department"
                    onChange={(e) => setNewUserDept(e.target.value)}
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
                    <option value="Management Studies">
                      Management Studies
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Media Sciences">Media Sciences</option>
                    <option value="Medical Physics">Medical Physics</option>
                    <option value="Mining Engineering">
                      Mining Engineering
                    </option>
                    <option value="Physics">Physics</option>
                    <option value="Printing and Packaging Technology">
                      Priniting and Packaging Technology
                    </option>
                  </select>
                  <label htmlFor="se-Department" className="DropDownLabel">
                    Department
                  </label>
                </div>
              </div>

              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={newUserCourseType}
                    id="se-CourseType"
                    onChange={(e) => chooseCourseType(e.target.value, "Single")}
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
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={newUserProgramme}
                    id="se-Programme"
                    onChange={(e) => chooseProgramme(e.target.value, "Single")}
                    disabled={!newUserCourseType}
                  >
                    <option value="">Choose Programme</option>
                    {getProgrammesList("Single").map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="se-Programme" className="DropDownLabel">
                    Programme
                  </label>
                </div>
              </div>

              <div className="RegisterDropDownWrapper">
                <div id="dv-RegisterBranch" className="RegisterDropDown">
                  <select
                    value={newUserBranch}
                    id="se-Branch"
                    onChange={(e) => chooseBranch(e.target.value, "Single")}
                    disabled={!newUserProgramme}
                  >
                    <option value="">Choose Branch</option>
                    {getBranchesList("Single").map((option, index) => (
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
            </div>
          </div>
        )}
        {newAdditionType === "Multiple" && (
          <div className="AddMultipleUserWrapper">
            <div className="AuthenticationInputWrapper">
              <input
                type="number"
                placeholder=" "
                value={commonRegNoPrefix}
                onChange={(e) => setCommonRegNoPrefix(e.target.value)}
                required
              />
              <label className="AuthenticationTextFieldLabel">
                Reg No. Prefix
              </label>
            </div>
            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={commonRegNoStart}
                  onChange={(e) => setCommonRegNoStart(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Reg No. Start
                </label>
              </div>
              <div className="RegisterInputWrapper">
                <input
                  type="number"
                  placeholder=" "
                  value={commonRegNoEnd}
                  onChange={(e) => setCommonRegNoEnd(e.target.value)}
                  required
                />
                <label
                  htmlFor="in-register_studentno"
                  className="RegisterTextFieldLabel"
                >
                  Reg No. End
                </label>
              </div>
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterInputWrapper">
                <input
                  type="text"
                  placeholder=" "
                  value={skipRegNo}
                  onChange={(e) => setSkipRegNoEnd(e.target.value)}
                  required
                />
                <label className="RegisterTextFieldLabel">Skip Reg No</label>
              </div>
              <div className="RegisterInputWrapper">
                <input
                  type="text"
                  placeholder=" "
                  value={commonEmailSuffix}
                  onChange={(e) => setCommonEmailSuffix(e.target.value)}
                  required
                />
                <label className="RegisterTextFieldLabel">
                  Common Email Suffix
                </label>
              </div>
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={commonUserDept}
                    id="se-Department"
                    onChange={(e) => setCommonUserDept(e.target.value)}
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
                    <option value="Management Studies">
                      Management Studies
                    </option>
                    <option value="Mechanical Engineering">
                      Mechanical Engineering
                    </option>
                    <option value="Media Sciences">Media Sciences</option>
                    <option value="Medical Physics">Medical Physics</option>
                    <option value="Mining Engineering">
                      Mining Engineering
                    </option>
                    <option value="Physics">Physics</option>
                    <option value="Printing and Packaging Technology">
                      Priniting and Packaging Technology
                    </option>
                  </select>
                  <label htmlFor="se-Department" className="DropDownLabel">
                    Department
                  </label>
                </div>
              </div>

              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={commonUserCourseType}
                    id="se-CourseType"
                    onChange={(e) =>
                      chooseCourseType(e.target.value, "Multiple")
                    }
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
            </div>

            <div className="RegistrationDivWrapper">
              <div className="RegisterDropDownWrapper">
                <div className="RegisterDropDown">
                  <select
                    value={commonUserProgramme}
                    id="se-Programme"
                    onChange={(e) =>
                      chooseProgramme(e.target.value, "Multiple")
                    }
                    disabled={!commonUserCourseType}
                  >
                    <option value="">Choose Programme</option>
                    {getProgrammesList("Multiple").map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="se-Programme" className="DropDownLabel">
                    Programme
                  </label>
                </div>
              </div>

              <div className="RegisterDropDownWrapper">
                <div id="dv-RegisterBranch" className="RegisterDropDown">
                  <select
                    value={commonUserBranch}
                    id="se-Branch"
                    onChange={(e) => chooseBranch(e.target.value, "Multiple")}
                    disabled={!commonUserProgramme}
                  >
                    <option value="">Choose Branch</option>
                    {getBranchesList("Multiple").map((option, index) => (
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
            </div>
          </div>
        )}

        {showUsers && (
          <div className="ListAdminsWrapper">
            <div className="AdminsListHeading">
              <p className="AdminTableHeading">The below users will be added</p>
            </div>
            <div className="AdminsList">
              <table className="CurrentAdminsTable">
                <thead>
                  <tr>
                    <th>Reg No.</th>
                    <th>Email</th>
                    <th>Dept.</th>
                    <th>Course Type</th>
                    <th>Programme</th>
                    <th>Branch</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => (
                    <tr key={index}>
                      <td>{user.registerNumber}</td>
                      <td>{user.email}</td>
                      <td>{user.department}</td>
                      <td>{user.courseType}</td>
                      <td>{user.programme}</td>
                      <td>{user.branch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {needApprovalSingle && (
          <div className="AdminMgmtApprovalWrapper">
            <div className="AdminMgmtApproval">
              <input
                type="checkbox"
                checked={approval}
                onChange={(e) => setApproval(e.target.checked)}
              />
              <span>
                I affirm and authorize the above mentioned person to be a new
                user of this site.
              </span>
            </div>
            <button
              style={{ marginTop: "2rem" }}
              onClick={getVerificationOtp}
              disabled={
                !approval ||
                !newUserEmail ||
                !newUserRegNo ||
                !newUserDept ||
                !newUserCourseType ||
                !newUserProgramme ||
                !newUserBranch
              }
              className="PreviewButton"
            >
              Approve
            </button>
          </div>
        )}

        {needApprovalMul && (
          <div className="AdminMgmtApprovalWrapper">
            <div className="AdminMgmtApproval">
              <input
                type="checkbox"
                checked={approval}
                onChange={(e) => setApproval(e.target.checked)}
              />
              <span>
                I affirm and authorize the above mentioned persons to be a new
                user of this site.
              </span>
            </div>
            <button
              style={{ marginTop: "2rem" }}
              onClick={getVerificationOtp}
              disabled={
                !approval ||
                !commonEmailSuffix ||
                !commonRegNoStart ||
                !commonRegNoEnd ||
                !commonUserDept ||
                !commonUserCourseType ||
                !commonUserProgramme ||
                !commonUserBranch
              }
              className="PreviewButton"
            >
              Approve
            </button>
          </div>
        )}

        {otpReqMessage && (
          <p style={{ color: `${otpReqMessageColor}` }}>{otpReqMessage}</p>
        )}

        {showOtp && (
          <div className="AdminMgmtOtpWrapper">
            <div className="AdminMgmtOtp">
              <input
                type="text"
                placeholder=" "
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                required
              />
              <label className="AdminMgmtTextFieldLabel2">Otp</label>
            </div>
            <button
              onClick={addUserToDB}
              disabled={!otpInput}
              className="AddInputButtons"
            >
              Add User
            </button>
          </div>
        )}

        {addUserMessage && (
          <p style={{ color: `${addUserMessageColor}` }}>{addUserMessage}</p>
        )}
      </div>
    </>
  );
};

export default AddNewUser;
