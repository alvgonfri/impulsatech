import axios from "./axios.js";
import Cookies from "js-cookie";

export const getFinancialDonationsByCampaignRequest = async (campaignId) =>
    axios.get(`/financial-donations/${campaignId}`);

export const createFinancialDonationRequest = async (financialDonation) =>
    axios.post(`/financial-donations`, financialDonation, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
