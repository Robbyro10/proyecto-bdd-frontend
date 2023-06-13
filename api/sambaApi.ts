import axios from "axios";

export const sambaApi = axios.create({
    baseURL: process.env.API_URL
})