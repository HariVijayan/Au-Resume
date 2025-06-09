import { useNavigate } from "react-router-dom";

const SuperAdmin = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper">
        <p>
          Super Admin Dashboard both read and write, add other admins.{" "}
          <span
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Click here to go back to main page.
          </span>
        </p>
      </div>
    </>
  );
};

export default SuperAdmin;
