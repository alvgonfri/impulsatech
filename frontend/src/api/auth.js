import axios from "./axios.js";
import Cookies from "js-cookie";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

export const verifyTokenRequest = async () =>
    axios.get(`/verify-token`, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
