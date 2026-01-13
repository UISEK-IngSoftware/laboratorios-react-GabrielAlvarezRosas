import { Box, Button, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useParams } from "react-router-dom";
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updatePokemon } from "../services/pokemonService";


export default function PokemonEdit() {


    const { id } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/pokemons/${id}/`)
            .then((res) => res.json())
            .then((data) => setPokemonData(data))
            .catch((err) => console.error("Error al cargar Pokémon:", err));
    }, [id]);

    if (!pokemonData) {
        return <Button color="inherit" href="/">Error al cargar el pokemon, click para volver</Button>;
    }
    const pokemonImageUrl = `${API_MEDIA_URL}${pokemonData.picture}`;

    const handleChange = (e) => {
        if (e.target.name === "picture") {
            setPokemonData({
                ...pokemonData,
                picture: e.target.files[0], 
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [e.target.name]: e.target.value,
            });
        }
    };



    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updatePokemon(id, pokemonData);
            alert("Pokemon actualizado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error actualizando el pokemon:", error);
            alert("Error actualizando el pokemon, por favor intente más tarde.");
            return;
        }
    }

    return (
        <>
            <Typography variant="h5" align="center">
                Detalles del Pokemon
            </Typography>
            <Box component="form" onSubmit={handleUpdate}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" value={pokemonData.name} onChange={handleChange} />
                <TextField label="Tipo" name="type" variant="outlined" value={pokemonData.type} onChange={handleChange} />
                <TextField label="Peso" name="weight" variant="outlined" type="number" value={pokemonData.weight} onChange={handleChange} />
                <TextField label="Altura" name="height" variant="outlined" type="number" value={pokemonData.height} onChange={handleChange} />
                <img
                    src={pokemonImageUrl}
                    alt={pokemonData.name}
                    style={{ border: "5px solid", color: "cadetblue", width: "200px", height: "200px" }}

                />
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    className="picture"
                    required
                    onChange={handleChange}
                />

            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                    Guardar cambios
                </Button>
                <Button variant="outlined" href="/">Volver</Button>
            </Box>

        </>
    )
}