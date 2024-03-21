import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    withCredentials: true,
});

export default instance;
