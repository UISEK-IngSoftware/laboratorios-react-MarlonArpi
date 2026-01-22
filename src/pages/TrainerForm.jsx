import { Typography, Box, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrainer } from "../services/trainerService";

export default function TrainerForm() {

  const [trainerData, setTrainerData] = useState({
    name: "",
    age: "",
    level: "",
    birthday: "",
    picture: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      setTrainerData({ ...trainerData, picture: files[0] });
    } else {
      setTrainerData({ ...trainerData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTrainer(trainerData);

      alert("Entrenador creado exitosamente");
      navigate("/trainers");

    } catch (error) {

      console.error("Error detallado:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        alert("Error 401: No tienes permiso. Inicia sesión.");
      } else {
        alert("Error al crear el Entrenador. Revisa consola.");
      }
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }} elevation={3}>

      <Typography variant="h4" gutterBottom fontWeight="bold">
        Formulario de Entrenador
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >

        <TextField
          label="Nombre"
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
          label="Fecha de nacimiento"
          type="date"
          name="birthday"
          value={trainerData.birthday}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Button variant="outlined" component="label">
          {trainerData.picture ? trainerData.picture.name : "Subir imagen"}
          <input
            hidden
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
          />
        </Button>

        <Button type="submit" variant="contained" size="large">
          Guardar Entrenador
        </Button>

      </Box>
    </Paper>
  );
}
