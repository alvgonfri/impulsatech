import { createContext, useContext, useState } from "react";
import {
    getCampaignsRequest,
    getCampaignRequest,
    createCampaignRequest,
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
    const [errors, setErrors] = useState([]);

    const getCampaigns = async () => {
        try {
            const res = await getCampaignsRequest();
            setCampaigns(res.data);
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
                getCampaign,
                createCampaign,
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
