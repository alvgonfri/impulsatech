import axios from "./axios.js";
import Cookies from "js-cookie";

export const getTimeDonationsByCampaignRequest = async (campaignId) =>
    axios.get(`/time-donations/${campaignId}`);

export const getTimeToInvestByCollaboratorRequest = async (collaboratorId) =>
    axios.get(`/time-donations/invest/${collaboratorId}`);

export const createTimeDonationRequest = async (timeDonation) =>
    axios.post(`/time-donations`, timeDonation, {
        headers: {
            Authorization: `${Cookies.get("token")}`,
        },
    });
