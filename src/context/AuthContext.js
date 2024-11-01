// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setUser(jwtDecode(response.data.token));
    navigate("/dashboard");
  };

  const googleLogin = () => {
    window.location.href = "https://task-manager-backend-o6uq.onrender.com/api/auth/google";
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("token", response.data.token);
      setUser(jwtDecode(response.data.token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, googleLogin, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
