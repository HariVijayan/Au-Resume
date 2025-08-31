const InfoDiv = ({
  requirement,
  explanation,
  examples,
  characterLimit,
  allowedCharacters,
}) => {
  return (
    <>
      {requirement && (
        <div className="InputInfoWrapper">
          <div className="InputInfoDiv">
            <div className="InputInfoRequirement">
              {requirement === "Mandatory" && (
                <p className="InputInfoHeading">
                  Requirement:{" "}
                  <span className="InputInfoValue" style={{ color: "red" }}>
                    {requirement}
                  </span>
                </p>
              )}
              {requirement === "Recommended" && (
                <p className="InputInfoHeading">
                  Requirement:{" "}
                  <span className="InputInfoValue" style={{ color: "green" }}>
                    {requirement}
                  </span>
                </p>
              )}
              {requirement === "Optional" && (
                <p className="InputInfoHeading">
                  Requirement:{" "}
                  <span className="InputInfoValue" style={{ color: "black" }}>
                    {requirement}
                  </span>
                </p>
              )}
            </div>
            <div className="InputInfoExplanation">
              {explanation && (
                <p className="InputInfoHeading">
                  Explanation:{" "}
                  <span className="InputInfoValue">{explanation}</span>
                </p>
              )}
            </div>
            <div className="InputInfoExamples">
              {examples && (
                <p className="InputInfoHeading">
                  Example: <span className="InputInfoValue">{examples}</span>
                </p>
              )}
            </div>
            <div className="InputInfoCharacterLimit">
              {characterLimit && (
                <p className="InputInfoHeading">
                  Character Limit:{" "}
                  <span className="InputInfoValue">{characterLimit}</span>
                </p>
              )}
            </div>
            <div className="InputInfoAllowedCharacters">
              {allowedCharacters && (
                <p className="InputInfoHeading">
                  Allowed Characters:{" "}
                  <span className="InputInfoValue">{allowedCharacters}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoDiv;
