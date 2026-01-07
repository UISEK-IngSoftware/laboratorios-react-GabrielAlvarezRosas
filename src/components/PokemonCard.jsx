import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonCard ({ pokemon }) {
    
    const pokemonImageUrl = `${API_MEDIA_URL}${pokemon.picture}`;
    const isLoggedIn = localStorage.getItem("access_token") !== null;

    return (
        <Card>
            <CardMedia
                component="img"
                height= {200}
                image={pokemonImageUrl}
                alt ={pokemon.name}
                style={{ width: "250px", height: "200px" }}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {pokemon.name}
                </Typography>
                <CardActions>
                    <Button size="small" href={`/details/${pokemon.id}`} >Ver detalles</Button>
                    {isLoggedIn && (
                                <>
                                    <Button size="small" >Editar Pokemon</Button>
                                    <Button size="small" color="error" >Eliminar Pokemon</Button>
                                </>
                    )}
                </CardActions>
                
            </CardContent>
                
        </Card>
    );
}