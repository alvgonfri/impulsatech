import axios from "./axios.js";
import Cookies from "js-cookie";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const registerOrganizationRequest = async (organization) =>
    axios.post(`/register-organization`, organization);

export const loginRequest = async (subject) => axios.post(`/login`, subject);

export const verifyTokenRequest = async () =>
    axios.get(`/verify-token`, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
