import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

export async function fetchPokemons() {
    const response = await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}

export async function createPokemon(pokemonData) {
    let pictureBase64 = "";
    
    if (pokemonData.picture instanceof File) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }

    const payload = {
        name: pokemonData.name,
        type: pokemonData.type,
        weight: pokemonData.weight,
        height: pokemonData.height,
        picture: pictureBase64 
    };

    const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    return response.data;
}