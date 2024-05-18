import axios from "./axios.js";

export const getSubjectRequest = async (id) => axios.get(`/subjects/${id}`);

export const getDonationsBySubjectRequest = async (id) =>
    axios.get(`/subjects/${id}/donations`);
