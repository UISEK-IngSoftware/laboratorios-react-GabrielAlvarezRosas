import { Card, CardActions, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import axios from "axios";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
const API_BASE_TRAINER_URL = import.meta.env.VITE_API_TRAINERS_URL;

export default function TrainerCard ({ trainer, onDelete }) {
    
    const trainerImageUrl = `${API_MEDIA_URL}${trainer.picture}`;
    const isLoggedIn = localStorage.getItem("access_token") !== null;

        
    const handleDelete = async () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar a ${trainer.name}?`)) {
            try{
                await axios.delete(`${API_BASE_TRAINER_URL}${trainer.id}/`);
                alert(`${trainer.name} ha sido eliminado.`);
                if (onDelete) onDelete(trainer.id);
            }catch (error){
                console.error("Error al eliminar el entrenador:", error);
                alert("No se pudo eliminar el entrenador. Por favor, intenta de nuevo.");
            }
        }
    }
    

    return (
        <Card>
            <CardMedia
                component="img"
                height= {100}
                image={trainerImageUrl}
                alt ={trainer.name}
                style={{ width: "200px", height: "350px" }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {trainer.name}
                </Typography>
                <CardActions>
                    <IconButton size="small" href={`/trainers/details/${trainer.id}`} style={{ backgroundColor: "cadetblue", color: "white" }}>
                        <i className="fa-regular fa-eye" ></i></IconButton>
                    {isLoggedIn && (
                                <>
                                    <IconButton size="small" href={`/trainers/update/${trainer.id}`} style={{ backgroundColor: "cadetblue", color: "white" }}>
                                        <i className="fa-solid fa-pencil" ></i>
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
                                        <i className="fa-solid fa-trash" ></i>
                                    </IconButton>
                                </>
                    )}
                </CardActions>
                
            </CardContent>
                
        </Card>
    );
}