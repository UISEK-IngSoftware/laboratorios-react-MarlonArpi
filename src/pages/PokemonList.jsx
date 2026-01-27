import { Grid } from "@mui/material"; 
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";
import Spinner from "../components/Spinner";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPokemons()
      .then(data => {
        setPokemons(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar pokemons:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleRemoveFromList = (id) => {
    setPokemons(pokemons.filter(p => p.id !== id));
  };

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {pokemons.map((pokemon) => (
        <Grid key={pokemon.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <PokemonCard pokemon={pokemon} onDeleteSuccess={handleRemoveFromList} />
        </Grid>
      ))}
    </Grid>
  );
}
