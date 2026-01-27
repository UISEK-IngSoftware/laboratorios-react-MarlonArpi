import { Card, CardActions, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteTrainer } from "../services/trainerService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";

export default function TrainerCard({ trainer, onDeleteSuccess }) {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  }, []);

  if (!trainer) return null;

  const imageUrl = trainer.picture || "https://via.placeholder.com/200";

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${trainer.name}?`)) { 
      try {
        await deleteTrainer(trainer.id);
        onDeleteSuccess(trainer.id);
      } catch (error) {
        console.error("Error al eliminar el entrenador:", error);
        alert("No se pudo eliminar el entrenador.");
      }
    }
  };

  return (
    <Card
      sx={{
        width: 220,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition: "0.4s ease",
        boxShadow: "0 0 10px rgba(51, 47, 47, 0.3)",
        background: "linear-gradient(180deg, #ffffff, #ffffff)",

        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow: "0 0 30px rgba(255,0,0,0.9)",
        },

        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(255,0,0,0.4), transparent)",
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
        alt={trainer.name}
        sx={{
          objectFit: "cover",
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
          sx={{ color: "#000000"}}
        >
          {trainer.name}
        </Typography>

        <Typography variant="body2" sx={{ color: "#ffffff" }}>
          Nivel: {trainer.level}
        </Typography>

        <Typography variant="body2" sx={{ color: "#bbb" }}>
          Edad: {trainer.age}
        </Typography>

      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        
        <Stack spacing={1} sx={{ width: '100%' }}>

          <Button
            size="small"
            variant="contained"
            startIcon={<InfoIcon />}
            sx={{
              background: "linear-gradient(45deg, #ff0000, #b30000)",
              fontWeight: "bold",

              "&:hover": {
                background: "linear-gradient(45deg, #ff3d3d, #ff0000)",
                boxShadow: "0 0 10px red",
              },
            }}
            onClick={() => navigate(`/trainers/${trainer.id}`)}
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
                onClick={() => navigate(`/trainers/edit/${trainer.id}`)}
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
