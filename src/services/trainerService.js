import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {
      console.error("Token expirado o inválido. Cerrando sesión...");
      localStorage.removeItem("access_token");
    }

    return Promise.reject(error);
  }
);



export async function createTrainer(trainerData) {

  const response = await axios.post(
    `${API_BASE_URL}/trainers/`,
    trainerData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  return response.data;
}


export async function getTrainers() {

  const response = await axios.get(`${API_BASE_URL}/trainers/`);
  return response.data;

}


export async function fetchTrainerById(id) {

  const response = await axios.get(`${API_BASE_URL}/trainers/${id}/`);
  return response.data;

}


export async function updateTrainer(id, trainerData) {

  let data = trainerData;


  if (!(trainerData instanceof FormData)) {

    data = new FormData();

    data.append("name", trainerData.name);
    data.append("age", trainerData.age);
    data.append("level", trainerData.level);
    data.append("birthday", trainerData.birthday);

    if (trainerData.picture instanceof File) {
      data.append("picture", trainerData.picture);
    }

  }

  const response = await axios.put(
    `${API_BASE_URL}/trainers/${id}/`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" }
    }
  );

  return response.data;

}


export async function deleteTrainer(id) {

  const response = await axios.delete(`${API_BASE_URL}/trainers/${id}/`);
  return response.data;

}
