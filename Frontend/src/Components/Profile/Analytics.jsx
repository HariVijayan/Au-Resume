import { useNavigate } from "react-router-dom";

const Analytics = ({ setLogoutClicked }) => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-AdminDBWrapper">
        <p>
          Admin Dashboard read only.{" "}
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

export default Analytics;
