import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="AdminConsoleActionsWrapper">
        <div
          className="AdminConsoleActionCard"
          onClick={() => navigate("/admin-dashboard/log-management")}
        >
          <div className="CardTitle">Logs Management</div>
          <div className="CardContent">
            <ul className="CardContentList">
              <li>View Admin Logs</li>
              <li>View Users Logs</li>
              <li>Log Actions</li>
            </ul>
          </div>
          <div className="CardLink">
            <span className="CardContentLink">
              Open{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
