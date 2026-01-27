import { Grid, Button, Container } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([])
  const isLoggedIn = localStorage.getItem("access_token") !== null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPokemons().then(data => {
      setPokemons(data)
    }).catch((error) => {
      console.error("Error obteniendo los pokemon:", error)
      alert("Error obteniendo los pokemones, intente más tarde.");
    }).finally(() => {
      setLoading(false);
    });
  }, []);



  const handleDelete = (id) => {
    setPokemons((prev) => prev.filter((p) => p.id !== id));
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
              href="/add-pokemon"
              sx={{ backgroundColor: '#65a7a3', color: '#fff' }}
            >
              Agregar Pokémon
            </Button>
          </>
        )}
      </Container>


      <Grid container spacing={2}>
        {pokemons.map(
          (pokemon) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
              <PokemonCard pokemon={pokemon} onDelete={handleDelete} />
            </Grid>
          ))}
      </Grid>
    </>
  );
}

