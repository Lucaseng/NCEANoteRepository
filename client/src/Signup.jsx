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
} from "@mui/material/";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleLinkClick = (e) => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fetchData = async () => {
      let url = "https://localhost:8080/api/users";

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
              <Alert sx={{ mt: 2, mb: 2 }} severity="error">
                {`Account creation failed - ${json.fail}`}
              </Alert>
            );
          } else {
            setMessage(
              <Alert sx={{ mt: 2, mb: 2 }} severity="success">
                Account succesfully created - Please login!
              </Alert>
            );
          }
        })
        .catch((error) => console.error(error));
    };

    fetchData();
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      <Typography variant="h4">Signup</Typography>
      {message}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
  );
}

export default Signup;
