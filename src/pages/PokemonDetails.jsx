import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById } from "../services/pokemonService";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

// URL base de tu backend (ej. http://localhost:8000)
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL || "http://localhost:8000";

export default function PokemonDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        fetchPokemonById(id)
            .then(data => setPokemon(data))
            .catch(() => alert("Error obteniendo el Pokémon"));
    }, [id]);

    if (!pokemon) return <Typography sx={{ textAlign: 'center', mt: 4 }}>Cargando...</Typography>;

    // Lógica de URL consistente con PokemonCard
    const imageUrl = pokemon.picture
        ? (pokemon.picture.startsWith('http') 
            ? pokemon.picture 
            : `${API_MEDIA_URL}${pokemon.picture}`)
        : "https://via.placeholder.com/300";

    return (
        <Box sx={{ p: 2 }}>
            <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, boxShadow: 5 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={imageUrl}
                    alt={pokemon.name}
                    sx={{ objectFit: "contain", bgcolor: '#f5f5f5', p: 2 }}
                />

                <CardContent>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {pokemon.name}
                    </Typography>

                    <Typography variant="h6" color="primary">
                        Tipo: {pokemon.type}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Peso:</strong> {pokemon.weight} kg
                    </Typography>

                    <Typography variant="body1">
                        <strong>Altura:</strong> {pokemon.height} m
                    </Typography>
                </CardContent>

                <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        onClick={() => navigate(-1)}
                    >
                        Volver al listado
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}