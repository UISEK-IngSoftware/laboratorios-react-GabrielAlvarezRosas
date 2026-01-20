import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useParams } from "react-router-dom";
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
import { fetchTrainers } from "../services/trainerService";



export default function PokemonDisplay() {


    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [trainers, setTrainers] = useState([]);


    useEffect(() => {
        fetch(`${API_BASE_URL}/pokemons/${id}/`)
            .then((res) => res.json())
            .then((data) => setPokemonData(data))
            .catch((err) => console.error("Error al cargar Pokémon:", err));

        fetchTrainers()
            .then((data) => setTrainers(data))
            .catch((err) => console.error("Error al cargar entrenadores:", err));

    }, [id]);

    if (!pokemonData) {
        return <Button color="inherit" href="/">Error al cargar el pokemon, click para volver</Button>;
    }
    const pokemonImageUrl = `${API_MEDIA_URL}${pokemonData.picture}`;
    const trainerName =
        trainers.find((t) => t.id === pokemonData.trainer)?.name || "Sin entrenador";


    return (
        <>
            <Typography variant="h5" align="center">
                Detalles del Pokemon
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4" >
                    Haz elegido a: {pokemonData.name}
                </Typography>
                <img
                    src={pokemonImageUrl}
                    alt={pokemonData.name}
                    style={{ border: "5px solid", color: "cadetblue", width: "200px", height: "200px" }}

                />
                <Typography variant="h6" >
                    Tipo: {pokemonData.type}
                </Typography>
                <Typography variant="h6" >
                    Altura: {pokemonData.height}
                </Typography>
                <Typography variant="h6" >
                    Peso: {pokemonData.weight}
                </Typography>
                <Typography variant="h6" >
                    Entrenador: {trainerName}
                </Typography>


            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button size="bigc" href="/">
                    Volver
                </Button>
            </Box>

        </>
    )
}