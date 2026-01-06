import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/userService";


export default function Login() {
    const [loginData, setLoginData] = useState({ username :"", password : ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await login(loginData.username, loginData.password);
            localStorage.setItem("access_token", response.access_token);
            alert("Inicio de sesión exitoso");
            navigate("/");
            
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.");
            return;
        }

    }

    return (
        <>  
            <Typography variant="h5" gutterBottom>
                Inicio de Sesión
            </Typography> 
            <Box component="form" onSubmit={handleSubmit}
            sx={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2}}>
                <TextField 
                label="Usuario" 
                name="username"
                value ={loginData.username}
                onChange={handleChange}
                required 
                />
                <TextField 
                label="Contraseña" 
                name="password"
                type="password"
                value ={loginData.password}
                onChange={handleChange}
                required 
                />
                <Button type="submit" variant="contained">Iniciar Sesión</Button>
            </Box>
        </>
    )
}