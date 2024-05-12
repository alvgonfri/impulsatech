import axios from "./axios.js";

export const getDonationsBySubjectRequest = async (id) =>
    axios.get(`/subjects/${id}/donations`);
