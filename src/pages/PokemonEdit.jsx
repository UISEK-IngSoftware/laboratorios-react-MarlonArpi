import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonById, updatePokemon } from "../services/pokemonService";
import { TextField, Button, Box, Paper, Typography, MenuItem } from "@mui/material";

const POKEMON_TYPES = [
  { value: 'A', label: 'Agua' }, { value: 'F', label: 'Fuego' },
  { value: 'P', label: 'Planta' }, { value: 'E', label: 'Eléctrico' },
  { value: 'T', label: 'Tierra' }, { value: 'N', label: 'Normal' },
];

export default function PokemonEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", type: "", weight: "", height: "", picture: null
  });

  useEffect(() => {
    fetchPokemonById(id).then(data => {
      setFormData({
        name: data.name || "",
        type: data.type || "",
        weight: data.weight || 0,
        height: data.height || 0,
        picture: null 
      });
    }).catch(err => console.error("Error cargando Pokémon:", err));
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
    dataToSend.append("type", formData.type);
    dataToSend.append("weight", formData.weight);
    dataToSend.append("height", formData.height);
    

    if (formData.picture instanceof File) {
      dataToSend.append("picture", formData.picture);
    }

    try {
      await updatePokemon(id, dataToSend);
      alert("¡Pokémon actualizado correctamente!");
      navigate(`/pokemon/${id}`);
    } catch (error) {
      console.error("Error en PUT:", error.response?.data || error);
      alert("Error al actualizar");
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4, boxShadow: 3 }}>
      <Typography variant="h5" mb={3} fontWeight="bold" textAlign="center">
        Editar Pokémon
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" name="name" value={formData.name} onChange={handleChange} required fullWidth />
        
        <TextField select label="Tipo" name="type" value={formData.type} onChange={handleChange} required fullWidth>
          {POKEMON_TYPES.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
        </TextField>
        
        <TextField label="Peso (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} required />
        <TextField label="Altura (m)" name="height" type="number" value={formData.height} onChange={handleChange} required />
        
        <Button variant="outlined" component="label" color="info">
          {formData.picture ? formData.picture.name : "Subir nueva imagen (Opcional)"}
          <input hidden type="file" name="picture" accept="image/*" onChange={handleChange} />
        </Button>

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
            Guardar Cambios
        </Button>
        <Button onClick={() => navigate(-1)} variant="text" color="inherit">
            Cancelar
        </Button>
      </Box>
    </Paper>
  );
}