// src/pages/Register.js
import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography, Avatar } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (avatar) data.append("avatar", avatar);

    await register(data);
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    googleLogin();
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
        onSubmit={handleRegister}
        sx={{
          width: 400,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Register
        </Typography>

        <Avatar
          src={preview || ""}
          sx={{ width: 64, height: 64, mx: "auto", mb: 2 }}
        />
        <Button variant="contained" component="label" fullWidth>
          Upload Avatar
          <input type="file" hidden onChange={handleAvatarChange} />
        </Button>

        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
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
          Register
        </Button>

        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleGoogleLogin}
        >
          Sign up with Google
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button onClick={() => navigate("/login")} variant="text">
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
