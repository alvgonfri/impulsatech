import axios from "./axios.js";
import Cookies from "js-cookie";

export const registerRequest = async (user) =>
    axios.post(`/register`, user, {
        headers: {
            ContentType: "multipart/form-data",
        },
    });

export const registerOrganizationRequest = async (organization) =>
    axios.post(`/register-organization`, organization, {
        headers: {
            ContentType: "multipart/form-data",
        },
    });

export const loginRequest = async (subject) => axios.post(`/login`, subject);

export const verifyTokenRequest = async () =>
    axios.get(`/verify-token`, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
