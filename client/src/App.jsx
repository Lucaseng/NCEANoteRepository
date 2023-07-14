import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Drawer from "./Components/Drawer";
import Upload from "./Upload";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ResponsiveDrawer from "./Components/ResponsiveDrawer";
import { Route, Routes } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import { fetchCurrentUser } from "./auth/authHandler";
import useAuthContext from "./auth/useAuthContext";
//require("dotenv").config();

function App() {
  const myUser = useAuthContext();

  const [user, setUser] = useState();
  const [signedOut, setSignedOut] = useState(true);
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);
  const [accountChange, setAccountChange] = useState(false);

  useEffect(() => {
    setUser(myUser.user);
  }, [myUser]);

  useEffect(() => {
    setAccountChange(true);
  }, [user]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
      className={"container"}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
      >
        {message}
      </Snackbar>
      <ResponsiveDrawer
        user={user}
        setUser={setUser}
        setMessage={setMessage}
        setOpen={setOpen}
        handleClose={handleClose}
        setSignedOut={setSignedOut}
      ></ResponsiveDrawer>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              accountChange={accountChange}
              setAccountChange={setAccountChange}
              setUser={setUser}
              setMessage={setMessage}
              setOpen={setOpen}
            />
          }
          exact
        />
        <Route
          path="/upload"
          element={
            <Upload
              user={user}
              setUser={setUser}
              setMessage={setMessage}
              setOpen={setOpen}
              handleClose={handleClose}
            />
          }
          exact
        />
        <Route
          path="/login"
          element={
            <Login
              setUser={setUser}
              setMessage={setMessage}
              setOpen={setOpen}
            />
          }
          exact
        />
        <Route
          path="/signup"
          element={<Signup setMessage={setMessage} setOpen={setOpen} />}
          exact
        />
      </Routes>
    </Box>
  );
}

export default App;
