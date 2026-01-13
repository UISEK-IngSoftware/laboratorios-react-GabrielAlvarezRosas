import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import axios from "axios";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PokemonCard({ pokemon, onDelete }) {

    const pokemonImageUrl = `${API_MEDIA_URL}${pokemon.picture}`;
    const isLoggedIn = localStorage.getItem("access_token") !== null;


    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${pokemon.name}?`)) {
            try {
                await axios.delete(`${API_BASE_URL}/pokemons/${pokemon.id}/`);
                alert(`${pokemon.name} ha sido eliminado.`);
                if (onDelete) onDelete(pokemon.id);
            } catch (error) {
                console.error("Error al eliminar el Pokémon:", error);
                alert("No se pudo eliminar el Pokémon. Por favor, intenta de nuevo.");
            }
        }
    }

    return (
        <Card>
            <CardMedia
                component="img"
                height={200}
                image={pokemonImageUrl}
                alt={pokemon.name}
                style={{ width: "250px", height: "200px" }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <CardActions>
                    <IconButton size="small" href={`/details/${pokemon.id}`} style={{ backgroundColor: "cadetblue", color: "white" }}>
                        <i className="fa-regular fa-eye" ></i>
                    </IconButton>
                    {isLoggedIn && (
                        <>
                            <IconButton size="small" href={`/update/${pokemon.id}`} style={{ backgroundColor: "cadetblue", color: "white" }}
                            >
                                <i className="fa-solid fa-pencil" ></i>
                            </IconButton>
                            <IconButton size="small" color="error" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}
                            >
                                <i className="fa-solid fa-trash" ></i>
                            </IconButton>
                        </>
                    )}
                </CardActions>

            </CardContent>

        </Card>
    );
}