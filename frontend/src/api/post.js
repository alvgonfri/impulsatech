import axios from "./axios.js";
import Cookies from "js-cookie";

export const getPostsByCampaignRequest = async (campaignId) =>
    axios.get(`/posts/${campaignId}`, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const createPostRequest = async (post) =>
    axios.post(`/posts`, post, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
