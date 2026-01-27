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
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition: "0.4s ease",
        boxShadow: "0 0 10px rgba(40, 120, 255, 0.25)",
        background: "linear-gradient(180deg, #ffffff, #ffffff)",

        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow: "0 0 30px rgba(0,140,255,0.9)",
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(0,140,255,0.35), transparent)",
          transition: "0.5s",
        },

        "&:hover::before": {
          left: "100%",
        },
      }}
    >

      <CardMedia
        component="img"
        height="160"
        image={imageUrl}
        alt={pokemon.name}
        sx={{
          objectFit: "contain",
          p: 2,
          transition: "0.4s",
          filter: "brightness(0.9)",

          "&:hover": {
            filter: "brightness(1.1)",
          },
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#0d47a1" }}
        >
          {pokemon.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#444" }}>
          Tipo: {pokemon.type}
        </Typography>

      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>

        <Stack spacing={1} sx={{ width: '100%' }}>

          <Button
            size="small"
            variant="contained"
            startIcon={<InfoIcon />}
            sx={{
              background: "linear-gradient(45deg, #1976d2, #0d47a1)",
              fontWeight: "bold",

              "&:hover": {
                background: "linear-gradient(45deg, #42a5f5, #1976d2)",
                boxShadow: "0 0 10px #2196f3",
              },
            }}
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
                sx={{
                  borderWidth: 2,
                  "&:hover": {
                    boxShadow: "0 0 10px orange",
                    transform: "scale(1.05)",
                  },
                }}
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
                sx={{
                  borderWidth: 2,
                  "&:hover": {
                    boxShadow: "0 0 12px red",
                    transform: "scale(1.05)",
                  },
                }}
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
