const modifyCustomList = (e, customInputIndex, resumeData, updateField) => {
  const { name, value } = e.target;
  const updatedCustomInput = [...resumeData.customInput];

  if (name === "listValues") {
    updatedCustomInput[customInputIndex][name] = value.split(",");
  } else {
    updatedCustomInput[customInputIndex][name] = value;
  }

  updateField("customInput", updatedCustomInput);
};

const modifyCustomPara = (e, customInputIndex, resumeData, updateField) => {
  const { name, value } = e.target;
  const updatedCustomInput = [...resumeData.customInput];

  updatedCustomInput[customInputIndex][name] = value;

  updateField("customInput", updatedCustomInput);
};

const modifySkillsList = (e, setSkillsetValue, resumeData, updateField) => {
  let { value } = e.target;
  let updatedSkills = { ...resumeData.skills };

  setSkillsetValue(value);

  let newSkills = value.split(",").filter((skill) => skill.trim().length > 0);

  newSkills = newSkills.map((skill) => skill.trim());

  updatedSkills = {
    type: "ListType",
    skillSet: newSkills,
  };

  updateField("skills", updatedSkills);
};

const modifySkillsPara = (e, setSkillsetValue, resumeData, updateField) => {
  const { value } = e.target;

  let updatedSkills = { ...resumeData.skills };

  let newSkills = value.trim();

  setSkillsetValue(value);

  updatedSkills = {
    type: "ParaType",
    skillSet: newSkills,
  };

  updateField("skills", updatedSkills);
};

const modifyCertificationsList = (
  e,
  setCertificationSetValue,
  resumeData,
  updateField
) => {
  let { value } = e.target;
  let updatedCertification = { ...resumeData.certifications };

  setCertificationSetValue(value);

  let newCertifications = value
    .split(",")
    .filter((certification) => certification.trim().length > 0);

  newCertifications = newCertifications.map((certification) =>
    certification.trim()
  );

  updatedCertification = {
    type: "ListType",
    certificationSet: newCertifications,
  };

  updateField("certifications", updatedCertification);
};

const modifyCertificationsPara = (
  e,
  setCertificationSetValue,
  resumeData,
  updateField
) => {
  const { value } = e.target;

  let updatedCertification = { ...resumeData.certifications };

  let newCertifications = value.trim();

  setCertificationSetValue(value);

  updatedCertification = {
    type: "ParaType",
    certificationSet: newCertifications,
  };

  updateField("certifications", updatedCertification);
};

const modifyLanguagesList = (e, setLanguageValue, resumeData, updateField) => {
  const { value } = e.target;
  let updatedLanguages = { ...resumeData.languages };

  setLanguageValue(value);

  updatedLanguages = value
    .split(",")
    .filter((language) => language.trim().length > 0);

  updatedLanguages = updatedLanguages.map((language) => language.trim());

  setLanguageValue(value);

  updateField("languages", updatedLanguages);
};

export {
  modifyCustomList,
  modifyCustomPara,
  modifySkillsList,
  modifySkillsPara,
  modifyCertificationsList,
  modifyCertificationsPara,
  modifyLanguagesList,
};
