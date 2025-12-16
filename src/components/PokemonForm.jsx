import { TextField, Box, Button, Typography } from "@mui/material";

export default function PokemonForm() {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                formulario de Pokemon
            </Typography>
            <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Nombre" name="name" variant="outlined" />
                <TextField label="Tipo" name="type" variant="outlined" />
                <TextField label="Peso" name="weight" variant="outlined" type="number" />
                <TextField label="Altura" name="height" variant="outlined" type="number" />
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    className="picture"
                    required
                />

                <Button type="submit" variant="contained" color="primary">Guardar</Button>
            </Box>

        </>
    )
}