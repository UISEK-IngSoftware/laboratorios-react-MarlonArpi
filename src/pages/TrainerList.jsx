import { Grid, Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTrainers } from "../services/trainerService";
import TrainerCard from "../components/TrainerCard";

export default function TrainerList() {
    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        fetchTrainers()
            .then((data) => setTrainers(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Mis Entrenadores
                </Typography>
                <Grid container spacing={3}>
                    {trainers.map((trainer) => (
                        <Grid item key={trainer.id} xs={12} sm={6} lg={4}>
                            <TrainerCard trainer={trainer} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}