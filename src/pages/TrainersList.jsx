import { Grid, Button, Container } from "@mui/material";
import TrainerCard from "../components/TrainerCard";
import { useEffect, useState } from "react";
import { fetchTrainers } from "../services/trainerService";
import Spinner from "../components/Spinner";

export default function TrainersList() {
  const [trainers, setTrainers] = useState([])
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTrainers().then(data => {
      setTrainers(data)
    }).catch((error) => {
      console.error("Error obteniendo los entrenadores:", error)
      alert("Error obteniendo los entrenadores, intente más tarde.");
    }).finally(() => {
      setLoading(false);
    });
  }, []);



  const handleDelete = (id) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading){
    return (
        <Spinner />
    );
  }
  return (
    <>
      <Container sx={{ display: 'flex', mb: 2, mt: 2 }}>
        {isLoggedIn && (
          <>
            <Button
              variant="contained"
              href="/trainers/add-trainer"
              sx={{ backgroundColor: '#65a7a3', color: '#fff' }}
            >
              Agregar Entrenador
            </Button>
          </>
        )}
      </Container>
      <Grid container spacing={2}>
        {trainers.map(
          (trainer) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <TrainerCard trainer={trainer} onDelete={handleDelete} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

