import React, { useState } from "react";
import { login, register } from "../api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export default function AuthForm({ onAuth }) {
  const [authMode, setAuthMode] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { username, password } = form;
    if (!username || !password) return;
    const res =
      authMode === "login"
        ? await login(username, password)
        : await register(username, password);
    if (res.token) {
      localStorage.setItem("token", res.token);
      onAuth();
    } else {
      setError(res.error || res.message);
    }
  };

  return (
    <Box
      display="flex"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bgcolor="#f5f6fa"
    >
      <Paper elevation={4} sx={{ p: 5, minWidth: 340 }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={1}>
          <LockIcon color="primary" fontSize="large" sx={{ mb: 1 }} />
          <Typography variant="h5" component="div" gutterBottom>
            {authMode === "login" ? "Login" : "Register"}
          </Typography>
        </Box>
        <ToggleButtonGroup
          fullWidth
          value={authMode}
          exclusive
          onChange={(_, v) => v && setAuthMode(v)}
          sx={{ mb: 2 }}
        >
          <ToggleButton value="login">Login</ToggleButton>
          <ToggleButton value="register">Register</ToggleButton>
        </ToggleButtonGroup>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            name="username"
            margin="normal"
            fullWidth
            value={form.username}
            onChange={handleChange}
            autoFocus
            autoComplete="username"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            margin="normal"
            fullWidth
            value={form.password}
            onChange={handleChange}
            autoComplete={
              authMode === "login" ? "current-password" : "new-password"
            }
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            {authMode === "login" ? "Login" : "Create account"}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </form>
      </Paper>
    </Box>
  );
}
