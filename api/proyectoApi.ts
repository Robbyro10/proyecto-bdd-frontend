import axios from "axios";

export const proyectoApi = axios.create({
    baseURL: process.env.API_URL
})