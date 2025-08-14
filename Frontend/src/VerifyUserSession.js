import axios from "axios";

const verifySessionForAdminRoutes = async (routeType) => {
  //Redirect to login page if previous session is invalid or user not an admin. If session is valid and user is admin, no action is taken.
  let userType = "";
  let serverResponse = "";

  try {
    const response = await axios.post(
      "http://localhost:5000/verifyAdminSession/check-admin-access",
      { routeType },
      { withCredentials: true }
    );
    if (
      response?.data?.message ===
      "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23"
    ) {
      userType = "Super Admin";
    } else if (
      response?.data?.message ===
      "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
    ) {
      userType = "Admin";
    } else if (
      response?.data?.message ===
      "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
    ) {
      userType = "Analytics";
    } else {
      throw new Error("Session invalid");
    }
    return { userType, serverResponse };
  } catch (error) {
    serverResponse = "Session expired login again";
    return { userType, serverResponse };
  }
};

const verifySessionForProtectedRoutes = async () => {
  //Redirect to login page if previous session is invalid. If session is valid, no action is taken.
  let serverResponse = "";

  try {
    const response = await axios.post(
      "http://localhost:5000/verifySession/protectedRoutes/check-access",
      {},
      { withCredentials: true }
    );
    return { serverResponse };
  } catch (error) {
    serverResponse = "Session expired login again";
    return { serverResponse };
  }
};

const verifySessionForUnProtectedRoutes = async () => {
  //Redirect to dashboard if there is a previous valid session available. If session is invalid, no action is taken.
  let userType = "";
  let serverResponse = "";
  let redirectRoute = "";

  try {
    const response = await axios.post(
      "http://localhost:5000/verifySession/authenticationRoutes/check-access",
      {},
      { withCredentials: true }
    );

    if (
      response?.data?.message ===
      "fkjbcvjhefbvjhbghvvjh3jjn23b23huiyuycbjhejbh23"
    ) {
      userType = "Super Admin";
      redirectRoute = "/admin-dashboard/super-admin";
    } else if (
      response?.data?.message ===
      "io6jiojjokomioynoiynhpopjijaoindioioahibhbHVgydv"
    ) {
      userType = "Admin";
      redirectRoute = "/admin-dashboard/admin-general";
    } else if (
      response?.data?.message ===
      "g87uh78875gonkloiyhoi0yh0iob5mi5u5hu899igoi5mo"
    ) {
      userType = "Analytics";
      redirectRoute = "/admin-dashboard/analytics";
    } else if (response?.data?.message === "Valid access token") {
      userType = "User";
      redirectRoute = "/resume-builder/template-choosing";
    }
    return { userType, redirectRoute, serverResponse };
  } catch (error) {
    serverResponse = "User doesn't have existing session.";
    return { userType, redirectRoute, serverResponse };
  }
};

export {
  verifySessionForAdminRoutes,
  verifySessionForProtectedRoutes,
  verifySessionForUnProtectedRoutes,
};
