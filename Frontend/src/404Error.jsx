import { useNavigate } from "react-router-dom";

const Error404Page = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="dv-404ErrorWrapper">
        <p>
          The site that your're looking for doesn't exist.{" "}
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

export default Error404Page;
