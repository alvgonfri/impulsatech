import { createContext, useContext, useState } from "react";
import {
    getCampaignsRequest,
    getCampaignsByStatusRequest,
    getFeaturedCampaignsRequest,
    getCampaignRequest,
    createCampaignRequest,
    updateCampaignRequest,
} from "../api/campaign.js";
import PropTypes from "prop-types";

const CampaignContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCampaign = () => {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error("useCampaign must be used within a CampaignProvider");
    }
    return context;
};

export const CampaignProvider = ({ children }) => {
    const [campaigns, setCampaigns] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
    const [errors, setErrors] = useState([]);

    const getCampaigns = async () => {
        try {
            const res = await getCampaignsRequest();
            setCampaigns(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCampaignsByStatus = async (status, page) => {
        try {
            const res = await getCampaignsByStatusRequest(status, page);
            setCampaigns(res.data.campaigns);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const getFeaturedCampaigns = async () => {
        try {
            const res = await getFeaturedCampaignsRequest();
            setFeaturedCampaigns(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCampaign = async (id) => {
        try {
            const res = await getCampaignRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const createCampaign = async (campaign) => {
        try {
            const res = await createCampaignRequest(campaign);
            setCampaigns([...campaigns, res.data]);
            return res.status;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const eliminateCampaign = async (id) => {
        try {
            const res = await updateCampaignRequest(id, { eliminated: true });
            setCampaigns(
                campaigns.map((campaign) =>
                    campaign._id === id
                        ? { ...campaign, eliminated: true }
                        : campaign
                )
            );
            return res.status;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const cancelCampaign = async (id) => {
        try {
            const res = await updateCampaignRequest(id, {
                status: "cancelled",
            });
            setCampaigns(
                campaigns.map((campaign) =>
                    campaign._id === id
                        ? { ...campaign, status: "cancelled" }
                        : campaign
                )
            );
            return res.status;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const completeCampaign = async (id) => {
        try {
            const res = await updateCampaignRequest(id, {
                status: "completed",
            });
            setCampaigns(
                campaigns.map((campaign) =>
                    campaign._id === id
                        ? { ...campaign, status: "completed" }
                        : campaign
                )
            );
            return res.status;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    return (
        <CampaignContext.Provider
            value={{
                campaigns,
                getCampaigns,
                getCampaignsByStatus,
                totalPages,
                featuredCampaigns,
                getFeaturedCampaigns,
                getCampaign,
                createCampaign,
                eliminateCampaign,
                cancelCampaign,
                completeCampaign,
                errors,
            }}
        >
            {children}
        </CampaignContext.Provider>
    );
};

CampaignProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CampaignContext;
