import axios from "./axios.js";

export const getCampaignsRequest = async () => axios.get(`/campaigns`);

export const getCampaignRequest = async (id) => axios.get(`/campaigns/${id}`);

export const createCampaignRequest = async (campaign) =>
    axios.post(`/campaigns`, campaign);
