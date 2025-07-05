import { useNavigate } from "react-router-dom";

const LogMgmt = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper">
        <p>Logs Management</p>
      </div>
    </>
  );
};

export default LogMgmt;
