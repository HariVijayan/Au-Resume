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

const AdminMgmt = () => {
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
        onClick={() =>
          navigate("/admin-dashboard/super-admin/admin-management/add-admin")
        }
      >
        <CardHeader
          title="Add Admin"
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
              Use this to add new admins to manage this site. Please note that
              you've to manually verify your identity through an OTP sent to
              your registered email to save changes. It will be recorded that
              you're the one who is adding this new admin.
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
        onClick={() =>
          navigate("/admin-dashboard/super-admin/admin-management/remove-admin")
        }
      >
        <CardHeader
          title="Remove Admin"
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
              Use this to remove existing admins from this site. Please note
              that you've to manually verify your identity through an OTP sent
              to your registered email to save changes. It will be recorded that
              you're the one who removed this existing admin.
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
        onClick={() =>
          navigate("/admin-dashboard/super-admin/admin-management/modify-admin")
        }
      >
        <CardHeader
          title="Modify Admin"
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
              Use this to elevate existing admin's permissions to be super
              admins or limit existing admin's permissions to be having
              analytics only (ViewOnly) access. You can also use this to reset
              password, unlock account or change the name of existing admin
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

export default AdminMgmt;
