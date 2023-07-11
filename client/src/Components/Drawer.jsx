import React from "react";
import {
  Drawer as MUIDrawer,
  List,
  ListItemButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Stack,
  Link,
  Alert,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function Drawer({ user, setUser, setMessage, handleClose, setOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSignOut = (e) => {
    localStorage.clear();
    setUser();
    navigate("/");
    setMessage(
      <Alert severity="success" onClose={handleClose}>
        Signed out succesfully - See you later!
      </Alert>
    );
    setOpen(true);
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
      onClick: () => navigate("/upload"),
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
  return (
    <MUIDrawer
      sx={{ width: "300px" }}
      PaperProps={{
        sx: {
          width: "300px",
          backgroundColor: "#233044",
          color: "#fff",
        },
      }}
      variant="permanent"
      className={"drawer"}
    >
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
          <img height="30em" src="../../public/books.svg" />
          <Box
            sx={{
              typography: "h4",
              fontSize: "1.1em",
              textAlign: "center",
              fontWeight: "light",
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
            <Divider></Divider>
            <Box sx={{ mt: "auto", pb: 2, pl: 3, pr: 4 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {user.first_Name + " " + user.last_Name}
              </Typography>
              <Stack sx={{ justifyContent: "space-between" }} direction="row">
                {" "}
                <Typography>{user.email}</Typography>
                <Link onClick={handleSignOut} color="#fff" href="#">
                  Sign Out
                </Link>
              </Stack>
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
    </MUIDrawer>
  );
}

export default Drawer;
