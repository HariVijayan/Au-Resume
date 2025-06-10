import { useNavigate } from "react-router-dom";

const AdminMgmt = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper">
        <p>Admin Management</p>
      </div>
    </>
  );
};

export default AdminMgmt;
