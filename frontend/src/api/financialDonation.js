import axios from "./axios.js";
import Cookies from "js-cookie";

export const getFinancialDonationsByCampaignRequest = async (campaignId) =>
    axios.get(`/financial-donations/${campaignId}`);

export const getReinvestmentsByCollaboratorRequest = async (collaboratorId) =>
    axios.get(`/financial-donations/reinvestments/${collaboratorId}`);

export const createFinancialDonationRequest = async (financialDonation) =>
    axios.post(`/financial-donations`, financialDonation, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const processPaymentRequest = async (financialDonation) =>
    axios.post(`/financial-donations/process-payment`, financialDonation, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });

export const updateFinancialDonationRequest = async (id, financialDonation) =>
    axios.patch(`/financial-donations/${id}`, financialDonation, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
