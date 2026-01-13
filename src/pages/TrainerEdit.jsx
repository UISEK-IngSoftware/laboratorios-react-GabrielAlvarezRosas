import { Box, Button, Typography, TextField } from "@mui/material";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_TRAINERS_URL;
import { useParams } from "react-router-dom";
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { updateTrainer } from "../services/trainerService";


export default function TrainerEdit() {

    const { id } = useParams();
    const [trainerData, setTrainerData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}${id}/`)
            .then((res) => res.json())
            .then((data) => setTrainerData(data))
            .catch((err) => console.error("Error al cargar entrenador:", err));
    }, [id]);

    if (!trainerData) {
        return <Button color="inherit" href="/">Error al cargar el entrenador, click para volver</Button>;
    }
    const trainerImageUrl = `${API_MEDIA_URL}${trainerData.picture}`;

    const handleChange = (e) => {
        if (e.target.name === "picture") {
            setTrainerData({
                ...trainerData,
                picture: e.target.files[0], 
            });
        } else {
            setTrainerData({
                ...trainerData,
                [e.target.name]: e.target.value,
            });
        }
    };



    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateTrainer(id, trainerData);
            alert("Entrenador actualizado exitosamente");
            navigate("/trainers");
        } catch (error) {
            console.error("Error actualizando el entrenador:", error);
            alert("Error actualizando el entrenador, por favor intente más tarde.");
            return;
        }
    }

    return (
        <>
            <Typography variant="h5" align="center">
                Detalles del Entrenador
            </Typography>
            <Box component="form" onSubmit={handleUpdate}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" value={trainerData.name} onChange={handleChange} />
                <TextField label="Apellido" name="lastname" variant="outlined" value={trainerData.lastname} onChange={handleChange} />
                <TextField label="Fecha de Nacimiento" name="birthdate" variant="outlined" type="date" value={trainerData.birthdate} onChange={handleChange} />
                <TextField label="Nivel" name="level" variant="outlined" type="number" value={trainerData.level} onChange={handleChange} />
                <img
                    src={trainerImageUrl}
                    alt={trainerData.name}
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
                <Button variant="outlined" href="/trainers">Volver</Button>
            </Box>

        </>
    )
}