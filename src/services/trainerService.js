import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTrainers() {
    try {
        const response = await axios.get(`${API_BASE_URL}/trainers/`);
        return response.data;
    } catch (error) {
        console.error("Error en fetchTrainers:", error);
        return [];
    }
}

export async function createTrainer(formData) {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/trainers/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error("Error en createTrainer:", error);
        throw error;
    }
}

export async function fetchTrainerById(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/trainers/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error en fetchTrainerById:", error);
        throw error;
    }
}
