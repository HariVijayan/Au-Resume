import axios from "axios";

const Sidebar = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/authenticateUser/logout",
        {},
        {
          withCredentials: true,
        }
      );

      localStorage.setItem("flagLogout", Date.now());
      setTimeout(() => localStorage.removeItem("flagLogout"), 100);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <input type="checkbox" id="cx-sidebar"></input>
      <nav className="Sidebar">
        <label htmlFor="cx-sidebar" className="SidebarIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </label>
        <ul className="SidebarMainNav">
          <li
            onClick={() => navigateTo("/resume-builder/template-choosing")}
            title="Resume Builder"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M756-120 537-339l84-84 219 219-84 84Zm-552 0-84-84 276-276-68-68-28 28-51-51v82l-28 28-121-121 28-28h82l-50-50 142-142q20-20 43-29t47-9q24 0 47 9t43 29l-92 92 50 50-28 28 68 68 90-90q-4-11-6.5-23t-2.5-24q0-59 40.5-99.5T701-841q15 0 28.5 3t27.5 9l-99 99 72 72 99-99q7 14 9.5 27.5T841-701q0 59-40.5 99.5T701-561q-12 0-24-2t-23-7L204-120Z" />
            </svg>
            <span>Resume Builder</span>
          </li>
          <li
            onClick={() => navigateTo("/success-score/jd")}
            title="JD Success Score"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M657-121 544-234l56-56 57 57 127-127 56 56-183 183Zm-537 1v-80h360v80H120Zm0-160v-80h360v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z" />
            </svg>
            <span>JD Success Score</span>
          </li>
          <li
            onClick={() => navigateTo("/success-score/role")}
            title="Role Fit Check"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M852-212 732-332l56-56 120 120-56 56ZM708-692l-56-56 120-120 56 56-120 120Zm-456 0L132-812l56-56 120 120-56 56ZM108-212l-56-56 120-120 56 56-120 120Zm246-75 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-361Z" />
            </svg>
            <span>Role Fit Check</span>
          </li>
        </ul>
        <ul className="SidebarLogout">
          <li onClick={() => logoutUser()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <span>Logout</span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
