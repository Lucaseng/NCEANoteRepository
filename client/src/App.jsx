import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Drawer from "./Components/Drawer";
import Upload from "./Upload";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { Route, Routes } from "react-router-dom";
import { Box, Snackbar } from "@mui/material";
import { fetchCurrentUser } from "./auth/authHandler";

function App() {
  const [user, setUser] = useState();
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await fetchCurrentUser(token)
          .then((response) => response.json())
          .then((json) => {
            setUser(json);
          })
          .catch((error) => console.error(error));
      }
    };

    checkUser();
  }, []);

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
      <Drawer
        user={user}
        setUser={setUser}
        setMessage={setMessage}
        setOpen={setOpen}
        handleClose={handleClose}
      />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        autoHideDuration={7000}
        onClose={handleClose}
      >
        {message}
      </Snackbar>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/upload" element={<Upload />} exact />
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
