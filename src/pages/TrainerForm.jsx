import { Typography, Box, TextField, Button, Container, Paper } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTrainer } from '../services/trainerService';

export default function TrainerForm() {

    const [trainerData, setTrainerData] = useState({
        name: '',
        age: '',
        level: '',
        birthday: '',
        picture: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "picture") {
            setTrainerData({
                ...trainerData,
                picture: files[0]
            });
        } else {
            setTrainerData({
                ...trainerData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("name", trainerData.name);
            formData.append("age", trainerData.age);
            formData.append("level", trainerData.level);
            formData.append("birthday", trainerData.birthday);
            formData.append("picture", trainerData.picture);

            await createTrainer(formData);

            alert("Entrenador creado exitosamente");
            navigate("/trainers");

        } catch (error) {
            console.error("Error:", error);
            alert("Error al crear el entrenador");
        }
    };

    return (
        <Container maxWidth="sm">

            <Box sx={{ mt: 4, mb: 4 }}>

                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    Formulario de Entrenador
                </Typography>

                <Paper elevation={3} sx={{ p: 4, mt: 2 }}>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
                    >

                        <TextField
                            label="Nombre Completo"
                            name="name"
                            value={trainerData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Edad"
                            type="number"
                            name="age"
                            value={trainerData.age}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Nivel"
                            type="number"
                            name="level"
                            value={trainerData.level}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Fecha de Nacimiento"
                            type="date"
                            name="birthday"
                            value={trainerData.birthday}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            required
                            fullWidth
                        />

                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            {trainerData.picture
                                ? `Archivo: ${trainerData.picture.name}`
                                : "Subir Foto del Entrenador"
                            }

                            <input
                                type="file"
                                name="picture"
                                hidden
                                accept="image/*"
                                required
                                onChange={handleChange}
                            />
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            Guardar Entrenador
                        </Button>

                    </Box>

                </Paper>

            </Box>

        </Container>
    );
}
