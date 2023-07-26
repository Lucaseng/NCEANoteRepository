import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Alert, Container, Button } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useAuthContext from "../auth/useAuthContext";

const drawerWidth = 300;

function ResponsiveDrawer(props) {
  const myUser = useAuthContext();
  const realUser = myUser.user;
  const { window, user, setUser, setMessage, handleClose, setOpen } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    localStorage.clear();
    setUser();

    setMessage(
      <Alert severity="success" onClose={handleClose}>
        Signed out succesfully - See you later!
      </Alert>
    );
    setOpen(true);
    navigate("/");
  };

  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon sx={{ color: "#fff" }} />,
      onClick: () => navigate("/"),
    },
    {
      text: "Upload",

      icon: <UploadIcon sx={{ color: "#fff" }} />,
      onClick: () => {
        if (user != null) {
          navigate("/upload");
        } else {
          setMessage(
            <Alert severity="error" onClose={handleClose}>
              You must be logged in to do that!
            </Alert>
          );
          setOpen(true);
        }
      },
    },
  ];

  const loginList = [
    {
      text: "Login",
      icon: <LoginIcon sx={{ color: "#fff" }} />,
      onClick: () => navigate("/login"),
    },
    {
      text: "Signup",
      icon: <AppRegistrationIcon sx={{ color: "#fff" }} />,
      onClick: () => navigate("/signup"),
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Stack
        sx={{
          p: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
        direction="row"
      >
        {" "}
        <img height="30em" src="../../books.svg" />
        <Box
          sx={{
            typography: "h4",
            fontSize: "1.1em",
            textAlign: "center",

            m: 2,
            fontWeight: "medium",
          }}
        >
          NCEA Note Repository
        </Box>
      </Stack>

      <Divider></Divider>
      <List>
        {itemsList.map((item, index) => (
          <ListItem
            sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}
            key={item.text}
            disablePadding
          >
            <ListItemButton onClick={item.onClick}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider></Divider>
      {user ? (
        <>
          <Box sx={{ mt: "auto", pb: 3 }}>
            <Divider sx={{ mb: 2 }}></Divider>
            <Container sx={{}}>
              <Typography sx={{ fontWeight: "bold" }}>
                {user.first_Name + " " + user.last_Name}
              </Typography>
              <Stack sx={{}} direction={"column"}>
                <Typography sx={{ wordBreak: "break-word" }}>
                  {user.email}
                </Typography>

                <Button
                  sx={{
                    mt: 2,
                    padding: 0.2,
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.05)" },
                  }}
                  variant="outlined"
                  color="inherit"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </Stack>
            </Container>
          </Box>
        </>
      ) : (
        <List sx={{ mt: "auto" }}>
          <Divider></Divider>
          {loginList.map((item, index) => (
            <ListItem
              sx={{ "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" } }}
              key={item.text}
              disablePadding
            >
              <ListItemButton onClick={item.onClick}>
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          display: { md: "none" },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "#233044",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#233044",
              color: "#fff",
            },
          }}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#233044",
              color: "#fff",
            },
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      ></Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
