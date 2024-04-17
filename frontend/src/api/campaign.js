import axios from "./axios.js";
import Cookies from "js-cookie";

export const getCampaignsRequest = async () => axios.get(`/campaigns`);

export const getCampaignsByStatusRequest = async (status) =>
    axios.get(`/campaigns/${status}`);

export const getCampaignRequest = async (id) => axios.get(`/campaigns/${id}`);

export const createCampaignRequest = async (campaign) =>
    axios.post(`/campaigns`, campaign, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
            ContentType: "multipart/form-data",
        },
    });

export const updateCampaignRequest = async (id, campaign) =>
    axios.patch(`/campaigns/${id}`, campaign, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
            ContentType: "multipart/form-data",
        },
    });
