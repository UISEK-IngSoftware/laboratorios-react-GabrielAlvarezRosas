import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_MEDIA_URL = import.meta.env.VITE_API_MEDIA_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/** 
 * Obtener pokemon desde la API
 * @returns data de pokemon
*/
export async function fetchPokemons() {
    console.log(`${API_BASE_URL}/pokemons/`);
    const response= await axios.get(`${API_BASE_URL}/pokemons/`);
    return response.data;
}

/**
 * Convertir un archivo a Base64
 * @param {} file 
 * @returns 
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result ya incluye el encabezado, lo usamos completo
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function createPokemon(pokemonData) {
    let pictureBase64 = "";
    if (pokemonData.picture) {
        pictureBase64 = await fileToBase64(pokemonData.picture);
    }
    const payload = {
        ...pokemonData,
        picture: pictureBase64,
    }
    console.log(payload);
    const response = await axios.post(`${API_BASE_URL}/pokemons/`, payload);
    return response.data;
}