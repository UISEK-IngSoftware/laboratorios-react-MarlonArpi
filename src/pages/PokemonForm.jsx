import { Typography, Box, TextField, Button, MenuItem } from '@mui/material';
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
];

export default function PokemonForm() {
    const [ pokemonData, setPokemonData ] = useState({
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
            setPokemonData({
                ...pokemonData,
                picture: files[0]
            });
        } else {
            setPokemonData({
                ...pokemonData,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createPokemon(pokemonData); 
            alert("Pokémon creado exitosamente");
            navigate('/');
        } catch (error) {
            console.error("Error al crear el Pokémon:", error);
            alert("Error al crear el Pokémon");
        }
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Formulario de Pokémon
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display : 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField 
                    label="Nombre" 
                    variant="outlined" 
                    name='name' 
                    required 
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Tipo"
                    name="type"
                    variant="outlined"
                    value={pokemonData.type}
                    onChange={handleChange}
                    required
                >
                    {POKEMON_TYPES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField 
                    label="Peso" 
                    variant="outlined" 
                    type="number" 
                    name='weight' 
                    required 
                    onChange={handleChange}
                />
                <TextField 
                    label="Altura" 
                    variant="outlined" 
                    type="number" 
                    name='height' 
                    required 
                    onChange={handleChange}
                />
                <input 
                    type="file" 
                    name="picture" 
                    accept="image/*" 
                    required 
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary">
                    Guardar Pokémon
                </Button>
            </Box>
        </>
    )
}