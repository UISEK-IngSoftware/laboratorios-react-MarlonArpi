import { Typography, Box, Grid } from "@mui/material"; 
import { useEffect, useState } from "react";
import TrainerCard from "../components/TrainerCard";
import { getTrainers } from "../services/trainerService";

export default function TrainerList() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrainers = async () => {
    try {
      const data = await getTrainers();
      console.log("TRAINERS RECIBIDOS", data);  
      setTrainers(data);
    } catch (error) {
      console.error("Error al cargar entrenadores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDeleteSuccess = (id) => {
    setTrainers(trainers.filter((t) => t.id !== id));
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5">Cargando entrenadores...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Mis Entrenadores
      </Typography>

      <Grid container spacing={3}>
        {trainers.map((trainer) => (

          <Grid item xs={12} sm={6} md={4} key={trainer.id}>
            <TrainerCard
              trainer={trainer}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}