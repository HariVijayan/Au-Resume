import { useNavigate } from "react-router-dom";

const User = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-UserProfileWrapper">
        <p>
          User Dashboard.{" "}
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

export default User;
