// src/pages/Login.js
import React, { useContext } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    await login(email, password);
    navigate("/dashboard"); 
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/dashboard"); 
    } catch (error) {
      console.error("OAuth login failed:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 350,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{" "}
          <Button onClick={() => navigate("/register")} variant="text">
            Register
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
