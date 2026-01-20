import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainerById } from "../services/trainerService";
import {
  Typography,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  CircularProgress
} from "@mui/material";

const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;

export default function TrainerDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadTrainer = async () => {
      try {
        const data = await fetchTrainerById(id);
        setTrainer(data);
      } catch (err) {   
        console.error("Error cargando entrenador:", err);
        alert("Error cargando entrenador");
      } finally {
        setLoading(false);
      }
    };

    loadTrainer();

  }, [id]);

  if (loading) {
    return (
      <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!trainer) {
    return (
      <Typography align="center" mt={5}>
        Entrenador no encontrado
      </Typography>
    );
  }

  const trainerImage = trainer.picture
    ? `${API_MEDIA_URL}/${trainer.picture}`
    : "https://via.placeholder.com/400x300?text=Sin+Imagen";

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>

      <Card sx={{ maxWidth: 420, boxShadow: 6 }}>

        <CardMedia
          component="img"
          height="300"
          image={trainerImage}
          alt={trainer.name}
        />

        <CardContent>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {trainer.name}
          </Typography>

          <Typography>
            Edad: {trainer.age}
          </Typography>

          <Typography>
            Nivel: {trainer.level}
          </Typography>

          <Typography>
            Fecha de nacimiento: {trainer.birthday}
          </Typography>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/trainer")}
          >
            Volver
          </Button>

        </CardContent>

      </Card>

    </Box>
  );
}
