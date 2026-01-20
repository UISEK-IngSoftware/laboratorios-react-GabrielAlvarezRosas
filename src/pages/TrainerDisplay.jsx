import { Box, Button, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_TRAINERS_URL;
import { useParams } from "react-router-dom";
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
import { fetchPokemons } from "../services/pokemonService";
import PokemonCard from "../components/PokemonCard";

export default function TrainerDisplay() {


    const { id } = useParams();
    const [trainerData, setTrainerData] = useState(null);
    const [pokemons, setPokemon] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}${id}/`)
            .then((res) => res.json())
            .then((data) => setTrainerData(data))
            .catch((err) => console.error("Error al cargar Entrenador:", err));
        fetchPokemons()
            .then((data) => setPokemon(data))
            .catch((err) => console.error("Error cargando Pokemones:", err));

    }, [id]);

    if (!trainerData) {
        return <Button color="inherit" href="/trainers">Error al cargar el entrenador, click para volver</Button>;
    }
    const trainerImageUrl = `${API_MEDIA_URL}${trainerData.picture}`;


    return (
        <>
            <Typography variant="h5" align="center">
                Detalles del Entrenador
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                <img
                    src={trainerImageUrl}
                    alt={trainerData.name}
                    style={{ border: "5px solid", color: "cadetblue", width: "200px", height: "300px" }}

                />
                <Typography variant="h6" >
                    Nombre: {trainerData.name}
                </Typography>
                <Typography variant="h6" >
                    Apellido: {trainerData.lastname}
                </Typography>
                <Typography variant="h6" >
                    Fecha de nacimiento: {trainerData.birthdate}
                </Typography>
                <Typography variant="h6" >
                    Nivel: {trainerData.level}
                </Typography>
                <Typography variant="h6" > Pokemones del entrenador:</Typography>
                <Grid container spacing={2}>
                    {pokemons
                    .filter((p) => p.trainer === trainerData.id) 
                    .map((pokemon) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
                                <PokemonCard pokemon={pokemon}  />
                            </Grid>
                        ))}
                </Grid>



            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button size="bigc" href="/trainers">
                    Volver
                </Button>
            </Box>

        </>
    )
}