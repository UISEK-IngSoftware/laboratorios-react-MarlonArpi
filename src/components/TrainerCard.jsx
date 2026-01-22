import { Card, CardActions, CardContent, CardMedia, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteTrainer } from "../services/trainerService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

export default function TrainerCard({ trainer, onDeleteSuccess }) {

  const navigate = useNavigate();

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
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", boxShadow: 3 }}>

      <CardMedia
        component="img"
        height="160"
        image={imageUrl}
        alt={trainer.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ flexGrow: 1 }}>

        <Typography variant="h6" fontWeight="bold">
          {trainer.name}
        </Typography>

        <Typography variant="body2">
          Nivel: {trainer.level}
        </Typography>

        <Typography variant="body2">
          Edad: {trainer.age}
        </Typography>

      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>

        <Stack spacing={1} sx={{ width: '100%' }}>

          <Button
            size="small"
            variant="contained"
            startIcon={<InfoIcon />}
            onClick={() => navigate(`/trainers/${trainer.id}`)}
          >
            Detalles
          </Button>

          <Stack direction="row" spacing={1}>

            <Button
              size="small"
              variant="outlined"
              color="warning"
              fullWidth
              startIcon={<EditIcon />}
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
              onClick={handleDelete}
            >
              Borrar
            </Button>

          </Stack>

        </Stack>

      </CardActions>

    </Card>
  );
}
