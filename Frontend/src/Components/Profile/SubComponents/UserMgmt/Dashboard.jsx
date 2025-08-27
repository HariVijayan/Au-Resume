import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const UserMgmt = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        width: "100%",
        margin: "5rem 0rem",
        gap: "3rem",
      }}
      flexDirection={{ xs: "column", md: "row" }}
    >
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          borderRadius: "12px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          "@media (min-width:900px)": {
            width: "30%",
          },
          ":hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        id="AdminMgmtCard"
        onClick={() => navigate("/admin-dashboard/user-management/add-user")}
      >
        <CardHeader
          title="Add Users"
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "16px 0px",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        />
        <CardActionArea>
          <CardContent>
            <Typography sx={{ textAlign: "justify" }}>
              Use this to add new users to access this site. Please note that
              you've to manually verify your identity through an OTP sent to
              your registered email to save changes.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", width: "90%" }}
        >
          <Button color="primary" endIcon={<LaunchIcon />}>
            Open
          </Button>
        </CardActions>
      </Card>

      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          borderRadius: "12px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          "@media (min-width:900px)": {
            width: "30%",
          },
          ":hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        onClick={() => navigate("/admin-dashboard/user-management/remove-user")}
      >
        <CardHeader
          title="Remove Users"
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "16px 0px",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        />
        <CardActionArea>
          <CardContent>
            <Typography sx={{ textAlign: "justify" }}>
              Use this to remove existing users from accessing this site. Please
              note that you've to manually verify your identity through an OTP
              sent to your registered email to save changes.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", width: "90%" }}
        >
          <Button color="primary" endIcon={<LaunchIcon />}>
            Open
          </Button>
        </CardActions>
      </Card>

      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          borderRadius: "12px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "100%",
          "@media (min-width:900px)": {
            width: "30%",
          },
          ":hover": {
            transform: "translateY(-10px)",
            boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
        width={{ xs: "100%", md: "30%" }}
        onClick={() => navigate("/admin-dashboard/user-management/modify-user")}
      >
        <CardHeader
          title="Modify Users"
          sx={{
            width: "100%",
            textAlign: "center",
            padding: "16px 0px",
            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            color: "#fff",
          }}
        />
        <CardActionArea>
          <CardContent>
            <Typography sx={{ textAlign: "justify" }}>
              Use this to unlock account, reset password of existing user
              accounts.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{ display: "flex", justifyContent: "flex-end", width: "90%" }}
        >
          <Button color="primary" endIcon={<LaunchIcon />}>
            Open
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserMgmt;
