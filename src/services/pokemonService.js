import axios  from "axios"; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

/**
 * Obtener la lista de pokemones desde la API
 * @returns data de Pokemons
 */

export  async function fetchPokemons() {
    console.log(`${API_BASE_URL}/pokemons/`);
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}