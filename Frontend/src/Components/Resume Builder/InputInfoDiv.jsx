import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const InputInfoDiv = ({ requirement, examples, explanation }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            borderLeft: `6px solid ${theme.palette.primary.main}`,
            borderRadius: "1rem",
            boxShadow: theme.custom.shadows.general,
            padding: "2rem",
            margin: "1rem 0rem",
            transition: "box-shadow 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            width: "70%",
            minHeight: "15vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Requirement:</Typography>
            {requirement === "Mandatory" && (
              <Typography
                sx={{
                  color: theme.palette.error.main,
                  marginLeft: "1rem",
                }}
              >
                Mandatory
              </Typography>
            )}
            {requirement === "Recommended" && (
              <Typography
                sx={{
                  color: theme.palette.success.main,
                  marginLeft: "1rem",
                }}
              >
                Recommended
              </Typography>
            )}
            {requirement === "Optional" && (
              <Typography sx={{ marginLeft: "1rem" }}>Optional</Typography>
            )}
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {explanation && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  Explanation:
                </Typography>
                <Typography sx={{ marginLeft: "1rem" }}>
                  {explanation}
                </Typography>
              </>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {examples && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>Examples:</Typography>
                <Typography sx={{ marginLeft: "1rem" }}>{examples}</Typography>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default InputInfoDiv;
