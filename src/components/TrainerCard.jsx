import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function PokemonCard({ pokemon }) {

  const navigate = useNavigate();

  const pokemonImageUrl = pokemon.picture
    ? `${API_MEDIA_URL}/${pokemon.picture}`
    : "https://via.placeholder.com/300";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

      <CardMedia
        component="img"
        height="200"
        image={pokemonImageUrl}
        alt={pokemon.name}
        sx={{ objectFit: "contain", p: 1 }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" fontWeight="bold">
          {pokemon.name}
        </Typography>

        <Typography variant="body2">
          Tipo: {pokemon.type}
        </Typography>

        <Typography variant="body2">
          Peso: {pokemon.weight} kg
        </Typography>

        <Typography variant="body2">
          Altura: {pokemon.height} m
        </Typography>
      </CardContent>

      <CardActions>
        <Button 
          fullWidth 
          variant="contained"
          onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        >
          Ver detalles
        </Button>
      </CardActions>

    </Card>
  );
}
