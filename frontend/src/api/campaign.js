import axios from "./axios.js";
import Cookies from "js-cookie";

export const getCampaignsRequest = async () => axios.get(`/campaigns`);

export const getCampaignsByStatusRequest = async (status, page) =>
    axios.get(`/campaigns/${status}?page=${page}`);

export const getFeaturedCampaignsRequest = async () =>
    axios.get(`/campaigns/featured`);

export const getInterestingCampaignsRequest = async () =>
    axios.get(`/campaigns/interesting`);

export const getCampaignsByPromoterRequest = async (id) =>
    axios.get(`/campaigns/promoter/${id}`);

export const getCampaignRequest = async (id) => axios.get(`/campaigns/${id}`);

export const getCampaignCollaboratorsRequest = async (id) =>
    axios.get(`/campaigns/${id}/collaborators`);

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
