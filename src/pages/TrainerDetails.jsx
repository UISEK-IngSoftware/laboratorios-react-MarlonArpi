import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainerById } from "../services/trainerService";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";


const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL || "http://localhost:8000";

export default function TrainerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [trainer, setTrainer] = useState(null);

    useEffect(() => {
        fetchTrainerById(id)
            .then(data => setTrainer(data))
            .catch(() => alert("Error obteniendo el Entrenador"));
    }, [id]);

    if (!trainer) {
        return (
            <Typography sx={{ textAlign: 'center', mt: 4 }}>
                Cargando...
            </Typography>
        );
    }

    const imageUrl = trainer.picture
        ? (trainer.picture.startsWith("http")
            ? trainer.picture
            : `${API_MEDIA_URL}${trainer.picture}`)
        : "https://via.placeholder.com/300";

    return (
        <Box sx={{ p: 2 }}>
            <Card sx={{ maxWidth: 500, margin: "auto", mt: 4, boxShadow: 5 }}>
                
                <CardMedia
                    component="img"
                    height="400"
                    image={imageUrl}
                    alt={trainer.name}
                    sx={{ objectFit: "contain", bgcolor: "#f5f5f5", p: 2 }}
                />

                <CardContent>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {trainer.name}
                    </Typography>

                    <Typography variant="h6" color="primary">
                        Nivel: {trainer.level}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Edad:</strong> {trainer.age} años
                    </Typography>

                    {trainer.birthday && (
                        <Typography variant="body1">
                            <strong>Cumpleaños:</strong> {trainer.birthday}
                        </Typography>
                    )}

                </CardContent>

                <Box sx={{ p: 2, textAlign: "center" }}>
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