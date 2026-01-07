import { useNavigate } from "react-router-dom";
import { AppBar, Container, Toolbar, Button } from "@mui/material";
import pokedexLogo from "../assets/pokedexlogo.png";
import "./Header.css";
import { logout } from "../services/userServices";

export default function Header() {
    const isLoggedIn = localStorage.getItem("access_token") !== null;
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }
    return (
        <Container>
            <div className="pokedex navbar" >
                <AppBar position="static" sx={{ backgroundColor: "#1A7B91" }} >
                    <Toolbar>
                        <div className="image-container" >
                            <img src={pokedexLogo} alt="Logo" height={100} style={{ border: "10px solid", color: "cadetblue", width: "500px", height: "250px" }} />
                        </div>
                    </Toolbar>
                    <Toolbar >
                        <Container>
                            <Button color="inherit" href="/">Inicio</Button>
                            {isLoggedIn && (
                                <>
                                    <Button color="inherit" href="/add-pokemon">Agregar Pokemon</Button>
                                    <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
                                </>
                            )}
                            {!isLoggedIn && (
                                <Button color="inherit" href="/login">Iniciar Sesión</Button>
                            )}

                        </Container>
                    </Toolbar>
                </AppBar>
            </div>
        </Container>
    );
}