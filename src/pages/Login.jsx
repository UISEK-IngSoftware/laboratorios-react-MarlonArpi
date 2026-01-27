import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";
import Spinner from "../components/Spinner";

export default function Login() {
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(loginData.username, loginData.password);
      const token = response.access || response.access_token;

      if (token) {
        localStorage.setItem("access_token", token);
        alert("¡Inicio de sesión exitoso!");
        navigate("/");
        window.location.reload();
      } else {
        alert("Error: El servidor no devolvió un token.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas.");
    }
  };

  if (loading) {
    return (
      <Spinner />
    );
  }

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8 }} elevation={3}>
      <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
        Inicio de Sesión
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}
      >
        <TextField
          label="Usuario"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" fullWidth>
          Entrar
        </Button>
      </Box>
    </Paper>
  );
}