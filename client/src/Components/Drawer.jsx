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
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import UploadIcon from "@mui/icons-material/Upload";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

function Drawer(props) {
  const theme = useTheme();
  const navigate = useNavigate();
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
        <Box
          sx={{
            typography: "h4",
            fontSize: "1.1em",
            textAlign: "center",
            fontWeight: "light",
            m: 2,
          }}
        >
          NCEA Note Repository
        </Box>
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
      </>
    </MUIDrawer>
  );
}

export default Drawer;
