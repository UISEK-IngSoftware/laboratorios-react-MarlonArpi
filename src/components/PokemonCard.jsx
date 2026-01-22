import { Card, CardActions, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deletePokemon } from "../services/pokemonService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000";

export default function PokemonCard({ pokemon, onDeleteSuccess }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  const imageUrl = pokemon.picture
    ? (pokemon.picture.startsWith('http') ? pokemon.picture : `${API_URL}${pokemon.picture}`)
    : "https://via.placeholder.com/200";

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${pokemon.name}?`)) {
      try {
        await deletePokemon(pokemon.id);
        onDeleteSuccess(pokemon.id);
      } catch (error) {
        console.error("Error al eliminar el Pokémon:", error);
        alert("No se pudo eliminar el Pokémon.");
      }
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="160"
        image={imageUrl}
        alt={pokemon.name}
        sx={{ objectFit: "contain", p: 2, bgcolor: "#f5f5f5" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">{pokemon.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Tipo: {pokemon.type}
        </Typography>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Stack spacing={1} sx={{ width: '100%' }}>


          <Button
            size="small"
            variant="contained"
            startIcon={<InfoIcon />}
            onClick={() => navigate(`/pokemon/${pokemon.id}`)}
          >
            Detalles
          </Button>


          {isAuthenticated && (
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                fullWidth
                startIcon={<EditIcon />}
                onClick={() => navigate(`/pokemon/edit/${pokemon.id}`)}
              >
                Editar
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                fullWidth
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Borrar
              </Button>
            </Stack>
          )}

        </Stack>
      </CardActions>
    </Card>
  );
}