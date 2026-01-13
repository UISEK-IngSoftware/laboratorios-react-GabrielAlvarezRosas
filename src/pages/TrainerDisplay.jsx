import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
const API_BASE_URL = import.meta.env.VITE_API_TRAINERS_URL;
import { useParams } from "react-router-dom";
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function TrainerDisplay() {


    const { id } = useParams();
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}${id}/`)
            .then((res) => res.json())
            .then((data) => setTrainerData(data))
            .catch((err) => console.error("Error al cargar Entrenador:", err));
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


            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button size="bigc" href="/trainers">
                    Volver
                </Button>
            </Box>

        </>
    )
}