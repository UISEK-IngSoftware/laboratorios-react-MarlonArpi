import { Grid } from "@mui/material"; // Volvemos a Grid estándar para v5
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";

// ... (imports iguales)

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons().then(data => setPokemons(data));
  }, []);

  // Función para quitar el pokemon borrado del estado actual
  const handleRemoveFromList = (id) => {
    setPokemons(pokemons.filter(p => p.id !== id));
  };

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {pokemons.map((pokemon) => (
        <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          {/* Pasamos la función como prop */}
          <PokemonCard pokemon={pokemon} onDeleteSuccess={handleRemoveFromList} />
        </Grid>
      ))}
    </Grid>
  );
}