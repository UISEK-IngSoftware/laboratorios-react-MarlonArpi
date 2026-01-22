import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchTrainerById, updateTrainer } from "../services/trainerService";
import { TextField, Button, Box, Paper, Typography } from "@mui/material";

export default function TrainerEdit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    level: "",
    birthday: "",
    picture: null
  });

  useEffect(() => {
    fetchTrainerById(id)
      .then(data => {
        setFormData({
          name: data.name || "",
          age: data.age || 0,
          level: data.level || 0,
          birthday: data.birthday || "",
          picture: null
        });
      })
      .catch(err => console.error("Error cargando Trainer:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append("name", formData.name);
    dataToSend.append("age", formData.age);
    dataToSend.append("level", formData.level);

    if (formData.birthday) {
      dataToSend.append("birthday", formData.birthday);
    }

    if (formData.picture instanceof File) {
      dataToSend.append("picture", formData.picture);
    }

    try {
      await updateTrainer(id, dataToSend);
      alert("¡Entrenador actualizado correctamente!");
      navigate(`/trainers/${id}`);
    } catch (error) {
      console.error("Error en PUT Trainer:", error.response?.data || error);
      alert("Error al actualizar entrenador");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4, boxShadow: 3 }}>

      <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
        Editar Entrenador
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >

        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Edad"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <TextField
          label="Nivel"
          name="level"
          type="number"
          value={formData.level}
          onChange={handleChange}
          required
        />

        <TextField
          label="Fecha de nacimiento"
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="outlined" component="label" color="info">
          {formData.picture ? formData.picture.name : "Subir nueva imagen (Opcional)"}
          <input
            hidden
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleChange}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Guardar Cambios
        </Button>

        <Button onClick={() => navigate(-1)} variant="text" color="inherit">
          Cancelar
        </Button>

      </Box>
    </Paper>
  );
}
