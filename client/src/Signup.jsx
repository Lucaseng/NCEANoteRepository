import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  FormControlLabel,
  Container,
  Typography,
  Checkbox,
  Button,
  Link,
  Alert,
  Fade,
  Avatar,
  Snackbar,
} from "@mui/material/";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useNavigate } from "react-router-dom";

function Signup({ setMessage, setOpen }) {
  const navigate = useNavigate();
  const handleLinkClick = (e) => {
    navigate("/login");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      let url = import.meta.env.VITE_APP_API_URL + "/api/users";

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_Name: e.target.firstName.value,
          last_Name: e.target.lastName.value,
          email: e.target.email.value,
          password: e.target.password.value,
          school: e.target.school.value,
          user_Type: "user",
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.fail) {
            setMessage(
              <Alert severity="error" onClose={handleClose}>
                {`Account creation failed - ${json.fail}`}
              </Alert>
            );
          } else {
            setMessage(
              <Alert severity="success" onClose={handleClose}>
                Account succesfully created - Please login!
              </Alert>
            );
          }
          setOpen(true);
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 3,
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <AppRegistrationIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          maxWidth="40vw"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="school"
                label="School"
                name="school"
                autoComplete="school"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link onClick={handleLinkClick} href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
}

export default Signup;
