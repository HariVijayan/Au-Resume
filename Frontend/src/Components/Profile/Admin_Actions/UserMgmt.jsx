import { useNavigate } from "react-router-dom";

const UserMgmt = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper">
        <p>User Management</p>
      </div>
    </>
  );
};

export default UserMgmt;
