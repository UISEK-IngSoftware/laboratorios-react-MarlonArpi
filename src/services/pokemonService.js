import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. Interceptor de PETICIÓN: Envía el token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Interceptor de RESPUESTA: Si da 401, limpia el token
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Token expirado o inválido. Cerrando sesión...");
      localStorage.removeItem("access_token");
      // Opcional: window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export async function createPokemon(pokemonData) {
  // Si pokemonData ya es un FormData (enviado desde el componente), úsalo directamente
  const response = await axios.post(`${API_BASE_URL}/pokemons/`, pokemonData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function fetchPokemons() {
  const response = await axios.get(`${API_BASE_URL}/pokemons/`);
  return response.data;
}

export async function fetchPokemonById(id) {
  const response = await axios.get(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}

// Actualizar un Pokémon existente
export async function updatePokemon(id, pokemonData) {
  // Si pokemonData es un objeto normal, conviértelo a FormData para la imagen
  let data = pokemonData;
  
  if (!(pokemonData instanceof FormData)) {
    data = new FormData();
    data.append("name", pokemonData.name);
    data.append("type", pokemonData.type);
    data.append("weight", pokemonData.weight);
    data.append("height", pokemonData.height);
    if (pokemonData.picture instanceof File) {
      data.append("picture", pokemonData.picture);
    }
  }

  const response = await axios.put(`${API_BASE_URL}/pokemons/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
export async function deletePokemon(id) {
  const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}/`);
  return response.data;
}