import { TextField, Box, Button, Typography } from "@mui/material";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../services/pokemonService";

export default function PokemonForm() {
    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        picture: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "picture") {
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createPokemon(pokemonData);
            alert("Pokemon creado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error creando el pokemon:", error);
            alert("Error creando el pokemon, por favor intente más tarde.");
            return;
        }
    }
    return (
        <>
            <Typography variant="h4" gutterBottom>
                formulario de Pokemon
            </Typography>
            <Box component="form" onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} />
                <TextField label="Tipo" name="type" variant="outlined" onChange={handleChange} />
                <TextField label="Peso" name="weight" variant="outlined" type="number" onChange={handleChange} />
                <TextField label="Altura" name="height" variant="outlined" type="number" onChange={handleChange} />
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    className="picture"
                    required
                    onChange={handleChange}
                />

                <Button type="submit" variant="contained" color="primary">Guardar</Button>
            </Box>

        </>
    )
}