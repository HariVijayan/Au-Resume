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

const LogMgmt = () => {
  const navigate = useNavigate();
  return (
    <Box
      id="CardWrapper"
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
        onClick={() => navigate("/admin-dashboard/log-management/admin-logs")}
      >
        <CardHeader
          title="View Admin Logs"
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
              Use this to view logs added by admins on their accounts for admin
              portal management actions and other error logs.
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
        onClick={() => navigate("/admin-dashboard/log-management/user-logs")}
      >
        <CardHeader
          title="View User Logs"
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
              Use this to view logs added by users on their accounts while using
              the resume builder and their error logs.
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
        onClick={() => navigate("/admin-dashboard/log-management/log-actions")}
      >
        <CardHeader
          title="Log Actions"
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
              Use this to clear existing logs or to download existing logs as an
              excel file.
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

export default LogMgmt;
