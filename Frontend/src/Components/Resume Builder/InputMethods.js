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

const modifyExpList = (e, experienceIndex, resumeData, updateField) => {
  const { name, value } = e.target;
  let updatedExperience = [...resumeData.experience];

  if (name === "roles") {
    updatedExperience[experienceIndex][name] = value.split(",");
  } else {
    updatedExperience[experienceIndex][name] = value;
  }

  updateField("experience", updatedExperience);
};

const modifyExpPara = (e, experienceIndex, resumeData, updateField) => {
  const { name, value } = e.target;
  let updatedExperience = [...resumeData.experience];

  updatedExperience[experienceIndex][name] = value;

  updateField("experience", updatedExperience);
};

const modifyExpYear = (
  fieldName,
  value,
  experienceIndex,
  resumeData,
  updateField
) => {
  let updatedExperience = [...resumeData.experience];
  updatedExperience[experienceIndex][fieldName] = value;
  updateField("experience", updatedExperience);
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

const modifyProjects = (e, newProjectIndex, resumeData, updateField) => {
  const { name, value } = e.target;

  let updatedProjects = [...resumeData.projects];
  updatedProjects[newProjectIndex][name] = value;
  updateField("projects", updatedProjects);
};

const modifyDiploma = (e, newDiplomaIndex, resumeData, updateField) => {
  const { name, value } = e.target;

  let updatedDiploma = [...resumeData.education.diploma];
  updatedDiploma[newDiplomaIndex][name] = value;
  updateField("education.diploma", updatedDiploma);
};

const modifyDiplomaYear = (
  fieldName,
  value,
  newDiplomaIndex,
  resumeData,
  updateField
) => {
  let updatedDiploma = [...resumeData.education.diploma];
  updatedDiploma[newDiplomaIndex][fieldName] = value;
  updateField("education.diploma", updatedDiploma);
};

const modifyPhd = (e, newPhdIndex, resumeData, updateField) => {
  const { name, value } = e.target;

  let updatedPhd = [...resumeData.education.phd];
  updatedPhd[newPhdIndex][name] = value;
  updateField("education.phd", updatedPhd);
};

const modifyPhdYear = (
  fieldName,
  value,
  newPhdIndex,
  resumeData,
  updateField
) => {
  let updatedPhd = [...resumeData.education.phd];
  updatedPhd[newPhdIndex][fieldName] = value;
  updateField("education.phd", updatedPhd);
};

const modifyPg = (e, newPgIndex, resumeData, updateField) => {
  const { name, value } = e.target;

  let updatedPg = [...resumeData.education.postGraduate];
  updatedPg[newPgIndex][name] = value;
  updateField("education.postGraduate", updatedPg);
};

const modifyPgYear = (
  fieldName,
  value,
  newPgIndex,
  resumeData,
  updateField
) => {
  let updatedPg = [...resumeData.education.postGraduate];
  updatedPg[newPgIndex][fieldName] = value;
  updateField("education.postGraduate", updatedPg);
};

const modifyUg = (e, newUgIndex, resumeData, updateField) => {
  const { name, value } = e.target;

  let updatedUg = [...resumeData.education.underGraduate];
  updatedUg[newUgIndex][name] = value;
  updateField("education.underGraduate", updatedUg);
};

const modifyUgYear = (
  fieldName,
  value,
  newUgIndex,
  resumeData,
  updateField
) => {
  let updatedUg = [...resumeData.education.underGraduate];
  updatedUg[newUgIndex][fieldName] = value;
  updateField("education.underGraduate", updatedUg);
};

export {
  modifyExpList,
  modifyExpPara,
  modifyExpYear,
  modifyCustomList,
  modifyCustomPara,
  modifySkillsList,
  modifySkillsPara,
  modifyCertificationsList,
  modifyCertificationsPara,
  modifyLanguagesList,
  modifyProjects,
  modifyPhd,
  modifyPhdYear,
  modifyPg,
  modifyPgYear,
  modifyUg,
  modifyUgYear,
  modifyDiploma,
  modifyDiplomaYear,
};
