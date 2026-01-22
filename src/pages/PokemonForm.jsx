import { Typography, Box, TextField, Button, MenuItem, Paper } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPokemon } from '../services/pokemonService';

const POKEMON_TYPES = [
  { value: 'A', label: 'Agua' },
  { value: 'F', label: 'Fuego' },
  { value: 'P', label: 'Planta' },
  { value: 'E', label: 'Eléctrico' },
  { value: 'T', label: 'Tierra' },
  { value: 'N', label: 'Normal' },
  { value: 'PS', label: 'Psíquico' },
];

export default function PokemonForm() {
  const [pokemonData, setPokemonData] = useState({
    name: '',
    type: '',
    weight: '',
    height: '',
    picture: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      setPokemonData({ ...pokemonData, picture: files[0] });
    } else {
      setPokemonData({ ...pokemonData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPokemon(pokemonData); 

      alert("Pokémon creado exitosamente ");
      navigate('/');
    } catch (error) {
      console.error("Error detallado:", error.response?.data || error.message);
      

      if (error.response?.status === 401) {
        alert("Error 401: No tienes permiso. Asegúrate de estar logueado.");
      } else {
        alert("Error al crear el Pokémon . Revisa la consola.");
      }
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 4 }} elevation={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Formulario de Pokémon
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Nombre" name="name" value={pokemonData.name} onChange={handleChange} required fullWidth />
        
        <TextField select label="Tipo" name="type" value={pokemonData.type} onChange={handleChange} required fullWidth>
          {POKEMON_TYPES.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>

        <TextField label="Peso" type="number" name="weight" value={pokemonData.weight} onChange={handleChange} required fullWidth />
        <TextField label="Altura" type="number" name="height" value={pokemonData.height} onChange={handleChange} required fullWidth />

        <Button variant="outlined" component="label">
          {pokemonData.picture ? pokemonData.picture.name : "Subir imagen"}
          <input hidden type="file" name="picture" accept="image/*" onChange={handleChange} />
        </Button>

        <Button type="submit" variant="contained" size="large">
          Guardar Pokémon
        </Button>
      </Box>
    </Paper>
  );
}