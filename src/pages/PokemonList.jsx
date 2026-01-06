import { Grid } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../services/pokemonService";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons()
      .then((data) => {
        console.log(data);
        setPokemons(data);
      })
      .catch((error) => {
        console.error("Error obteniendo los pokemons:", error);
        alert(
          "Error al obtener la lista de pokemons. Por favor, intenta nuevamente más tarde."
        );
      });
  }, []);
  return (
    <Grid container spacing={2}>
      {pokemons.map((pokemon) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
}
