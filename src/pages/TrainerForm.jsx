import { TextField, Box, Button, Typography } from "@mui/material";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrainer } from "../services/trainerService";

export default function TrainerForm() {
    const [trainerData, setTrainerData] = useState({
        name: "",
        lastname: "",
        birthdate: "",
        level: "",
        picture: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "picture") {
            setTrainerData({
                ...trainerData,
                picture: files[0]
            });
        } else {
            setTrainerData({
                ...trainerData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createTrainer(trainerData);
            alert("Entrenador creado exitosamente");
            navigate("/trainers");
        } catch (error) {
            console.error("Error creando el entrenador:", error);
            alert("Error creando el entrenador, por favor intente más tarde.");
            return;
        }
    }
    return (
        <>
            <Typography variant="h4" gutterBottom>
                formulario de Entrenador
            </Typography>
            <Box component="form" onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" onChange={handleChange} />
                <TextField label="Apellido" name="lastname" variant="outlined" onChange={handleChange} />
                <TextField label="" name="birthdate" variant="outlined" type="date" onChange={handleChange} />
                <TextField label="Nivel" name="level" variant="outlined" type="number" onChange={handleChange} />
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