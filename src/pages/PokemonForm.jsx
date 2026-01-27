import { TextField, Box, Button, Typography , MenuItem} from "@mui/material";
import { use, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPokemon } from "../services/pokemonService";
import { fetchTrainers } from "../services/trainerService";
import Spinner from "../components/Spinner";

export default function PokemonForm() {
    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState({
        name: "",
        type: "",
        weight: "",
        height: "",
        picture: null,
        trainer: ""
    });

    const [trainers, setTrainers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // cargar entrenadores al montar el componente
        fetchTrainers()
            .then((data) => setTrainers(data))
            .catch((err) => console.error("Error cargando entrenadores:", err));
    }, []);

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
        setLoading(true);
        try {
            await createPokemon(pokemonData);
            alert("Pokemon creado exitosamente");
            navigate("/");
        } catch (error) {
            console.error("Error creando el pokemon:", error);
            alert("Error creando el pokemon, por favor intente más tarde.");
            return;
        }finally {
            setLoading(false);
        }
    }
    if (loading){
        return (
            <Spinner />
        );
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
                <TextField
                    select
                    label="Entrenador"
                    name="trainer"
                    variant="outlined"
                    value={pokemonData.trainer}
                    onChange={handleChange}
                >
                    {trainers.map((trainer) => (
                        <MenuItem key={trainer.id} value={trainer.id}>
                            {trainer.name}
                        </MenuItem>
                    ))}
                </TextField>

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