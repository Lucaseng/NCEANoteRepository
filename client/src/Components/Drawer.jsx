import React from 'react'
import {Drawer as MUIDrawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Typography, Box, Divider } from "@mui/material/";
import { useNavigate } from "react-router-dom";

function Drawer(props) {
    const navigate = useNavigate();
    const itemsList = [{
        text: 'Home',
        onClick: () => navigate('/')
    }, {
        text: 'Upload',
        onClick: () => navigate('/upload')
    }]

    const loginList = [{
        text: 'Login',
        onClick: () => navigate('/login')
    }, {
        text: 'Signup',
        onClick: () => navigate('/signup')
    }]
  return (
    <MUIDrawer
    sx={{width: '220px'}}
    PaperProps={{
        sx: {
            width: '220px',
        }
      }}
    variant="permanent" className={"drawer"}>
        <>
        <Box sx={{
        typography: 'h4',
        fontSize: "1.1em",
        textAlign: 'center',
        m: 2
       }}>NCEA Note Repository</Box>
       <Divider></Divider>
        <List>

          {itemsList.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider></Divider>
        <List sx={{ mt: "auto"}}>
        <Divider></Divider>
        {loginList.map((item, index) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        </>
    </MUIDrawer>
  )
}

export default Drawer