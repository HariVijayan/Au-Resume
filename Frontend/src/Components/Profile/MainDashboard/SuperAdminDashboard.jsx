import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LaunchIcon from "@mui/icons-material/Launch";
import Box from "@mui/material/Box";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import DownloadIcon from "@mui/icons-material/Download";

const SuperAdmin = () => {
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
        onClick={() =>
          navigate("/admin-dashboard/super-admin/admin-management")
        }
      >
        <CardHeader
          title="Admin Management"
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
            <List>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add New Admins"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <PersonRemoveIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Remove Existing Admins"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modify Admin Permissions"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
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
        onClick={() => navigate("/admin-dashboard/user-management")}
      >
        <CardHeader
          title="User Management"
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
            <List>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Add New Users"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <PersonRemoveIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Remove Existing Users"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <ManageAccountsIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Modify User Details"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
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
        onClick={() => navigate("/admin-dashboard/log-management")}
      >
        <CardHeader
          title="Log Management"
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
            <List>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    <LockPersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="View Admin Logs"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <FolderSharedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="View User Logs"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={{
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <DownloadIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Log Actions"
                    sx={{ textAlign: "center" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
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

export default SuperAdmin;
