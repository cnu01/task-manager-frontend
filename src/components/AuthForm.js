// src/components/AuthForm.js
import React, { useState } from "react";
import { Box, Button, TextField, Typography, Avatar } from "@mui/material";

const AuthForm = ({ onSubmit, isSignup = false, onAvatarChange }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ firstName, lastName, username, email, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 4,
        textAlign: "center",
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" mb={2}>
        {isSignup ? "Register" : "Login"}
      </Typography>
      {isSignup && (
        <>
          <Avatar
            sx={{ width: 64, height: 64, mx: "auto", mb: 2 }}
            src=""
            alt="Avatar"
          />
          <Button variant="contained" component="label">
            Upload Avatar
            <input type="file" hidden onChange={onAvatarChange} />
          </Button>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </>
      )}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {isSignup ? "Register" : "Login"}
      </Button>
      {!isSignup && (
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
          Sign in with Google
        </Button>
      )}
    </Box>
  );
};

export default AuthForm;
