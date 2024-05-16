import axios from "./axios.js";
import Cookies from "js-cookie";

export const getCampaignStatsRequest = async () =>
    axios.get("/stats/campaigns", {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const getTagRankingRequest = async () =>
    axios.get("/stats/tags", {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const getFinancialStatsRequest = async () =>
    axios.get("/stats/financial", {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const getTimeStatsRequest = async () =>
    axios.get("/stats/time", {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
