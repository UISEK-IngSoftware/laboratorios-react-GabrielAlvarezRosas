import axios from "axios";

const API_BASE_URL_TRAINERS = import.meta.env.VITE_API_TRAINERS_URL;
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
 * @returns data de entrenador
*/
export async function fetchTrainers() {
    console.log(`${API_BASE_URL_TRAINERS}`);
    const response= await axios.get(`${API_BASE_URL_TRAINERS}`);
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

export async function createTrainer(trainerData) {
    let pictureBase64 = "";
    if (trainerData.picture) {
        pictureBase64 = await fileToBase64(trainerData.picture);
    }
    const payload = {
        ...trainerData,
        picture: pictureBase64,
    }
    console.log(payload);
    const response = await axios.post(`${API_BASE_URL_TRAINERS}`, payload);
    return response.data;
}

export async function updateTrainer(id, trainerData) {
  let payload = {
    ...trainerData,
    
  };

   if (trainerData.picture instanceof File) {
    const pictureBase64 = await fileToBase64(trainerData.picture);
    payload.picture = pictureBase64;
  } else {
   
    delete payload.picture;
  }

  console.log("Payload enviado:", payload);

  const response = await axios.patch(`${API_BASE_URL_TRAINERS}${id}/`, payload);
  return response.data;
}
