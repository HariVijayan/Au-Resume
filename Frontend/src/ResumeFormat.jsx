import { create } from "zustand";

const ResumeInputTemplate = create((set) => ({
  resumeData: {
    metaData: {
      template: "",
    },
    personal: {
      name: "",
      bio: "",
      mobile: "",
      email: "",
      location: "",
    },
    links: {
      linkedinUserName: "",
      githubUserName: "",
      websiteDisplayName: "",
      websiteUrl: "",
    },
    summary: "",
    education: {
      phd: [
        {
          name: "",
          university: "",
          startYear: "",
          endYear: "",
          specialization: "",
          additionalInfo: "",
        },
      ],
      postGraduate: [
        {
          name: "",
          university: "",
          startYear: "",
          endYear: "",
          cgpa: "",
          additionalInfo: "",
        },
      ],
      underGraduate: [
        {
          name: "",
          university: "",
          year: "",
          cgpa: "",
          additionalInfo: "",
        },
      ],
      diploma: [
        {
          name: "",
          university: "",
          startYear: "",
          endYear: "",
          cgpa: "",
          additionalInfo: "",
        },
      ],
      hsc: {
        name: "",
        year: "",
        grade: "",
        additionalInfo: "",
      },
      sslc: {
        name: "",
        year: "",
        grade: "",
        additionalInfo: "",
      },
    },
    experience: [
      {
        style: "",
        company: "",
        location: "",
        year: "",
        designation: "",
        team: "",
        roles: [],
        description: "",
      },
    ],
    projects: [
      {
        name: "",
        displayLink: "",
        linkUrl: "",
        description: "",
        techStack: "",
      },
    ],
    skills: {
      type: "",
      skillSet: [],
    },
    certifications: {
      type: "",
      certificationSet: [],
    },
    languages: [],
    customInput: [
      {
        title: "",
        style: "",
        listValues: [],
        paraValues: "",
      },
    ],
  },

  setResumeData: (newData) => set({ resumeData: newData }),

  updateField: (path, value) =>
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      let ref = { ...state.resumeData };

      let tempRef = ref;
      keys.forEach((key) => {
        tempRef[key] = { ...tempRef[key] };
        tempRef = tempRef[key];
      });

      tempRef[lastKey] = value;
      return { resumeData: ref };
    }),

  pushToArray: (path, newEntry) =>
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      let ref = state.resumeData;

      let tempRef = ref;
      keys.forEach((key) => {
        tempRef[key] = { ...tempRef[key] };
        tempRef = tempRef[key];
      });

      tempRef[lastKey].push(newEntry);
      return { resumeData: { ...state.resumeData } };
    }),

  removeFromArray: (path, index) =>
    set((state) => {
      const keys = path.split(".");
      const lastKey = keys.pop();
      let ref = state.resumeData;

      for (const key of keys) {
        ref = ref[key];
      }

      ref[lastKey].splice(index, 1);
      return { resumeData: { ...state.resumeData } };
    }),
}));

export default ResumeInputTemplate;
