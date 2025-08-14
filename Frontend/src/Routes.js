const protectedRoutes = [
  "/resume-builder/template-choosing",
  "/resume-builder/basic-details",
  "/resume-builder/experience",
  "/resume-builder/education/phd",
  "/resume-builder/education/pg",
  "/resume-builder/education/ug",
  "/resume-builder/education/diploma",
  "/resume-builder/education/school",
  "/resume-builder/projects",
  "/resume-builder/skills",
  "/resume-builder/certifications",
  "/resume-builder/languages-known",
  "/resume-builder/custom-input",
  "/user-profile",
];

const superAdminRoutes = [
  "/admin-dashboard/super-admin",
  "/admin-dashboard/super-admin/admin-management",
  "/admin-dashboard/super-admin/admin-management/add-admin",
  "/admin-dashboard/super-admin/admin-management/remove-admin",
  "/admin-dashboard/super-admin/admin-management/modify-admin",
];

const adminRoutes = [
  "/admin-dashboard/admin-general",
  "/admin-dashboard/user-management",
  "/admin-dashboard/user-management/add-user",
  "/admin-dashboard/user-management/remove-user",
  "/admin-dashboard/user-management/modify-user",
];

const analyticsAdminRoutes = [
  "/admin-dashboard/log-management",
  "/admin-dashboard/log-management/admin-logs",
  "/admin-dashboard/log-management/user-logs",
  "/admin-dashboard/log-management/log-actions",
];

export { protectedRoutes, superAdminRoutes, adminRoutes, analyticsAdminRoutes };
