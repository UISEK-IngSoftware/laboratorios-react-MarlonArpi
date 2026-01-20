import { useNavigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import pokedexLogo from "../assets/pokedex-logo.png";
import { logout } from "../services/userService";
import "./Header.css";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div className="pokedex navbar">
            <AppBar position="static">
                <Toolbar>
                    <div className="image-container">
                        <img src={pokedexLogo} alt="Logo" height={100} />
                    </div>
                </Toolbar>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">Inicio</Button>
                    
                    {isLoggedIn && (
                        <>
                            <Button color="inherit" component={Link} to="/add-pokemon">Agregar Pokémon</Button>
                            <Button color="inherit" component={Link} to="/add-trainer">Agregar Entrenador</Button>
                            <Button color="inherit" component={Link} to="/trainer">Ver Entrenadores</Button>
                            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                        </>
                    )}

                    {!isLoggedIn && (
                        <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}