import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Button,
  Grid,
  TextField,
  Checkbox,
  Link,
  Snackbar,
  Alert,
} from "@mui/material/";
import { fetchCurrentUser } from "./auth/authHandler";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
function Login({ setUser, setMessage, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      let url = "https://localhost:8080/api/auth";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      })
        .then((response) => response.json())
        .then(async (json) => {
          if (json.fail) {
            setMessage(
              <Alert severity="error" onClose={handleClose}>
                {`Sign in failed - ${json.fail}`}
              </Alert>
            );
          } else {
            localStorage.setItem("token", json.token);
            setMessage(
              <Alert severity="success" onClose={handleClose}>
                Account signed in succesfully!
              </Alert>
            );
            await fetchCurrentUser(json.token)
              .then((response) => response.json())
              .then((json) => {
                setUser(json);
              })
              .catch((error) => console.error(error));

            navigate("/");
          }
          setOpen(true);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        mt: 3,
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          width="40vw"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
