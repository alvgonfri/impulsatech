import axios from "./axios.js";
import Cookies from "js-cookie";

export const getCampaignsRequest = async () => axios.get(`/campaigns`);

export const getCampaignRequest = async (id) => axios.get(`/campaigns/${id}`);

export const createCampaignRequest = async (campaign) =>
    axios.post(`/campaigns`, campaign, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
