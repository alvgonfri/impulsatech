import { createContext, useContext, useEffect, useState } from "react";
import {
    getCampaignsRequest,
    getCampaignsByStatusRequest,
    getFeaturedCampaignsRequest,
    getInterestingCampaignsRequest,
    getCampaignsByPromoterRequest,
    searchCampaignsRequest,
    getCampaignRequest,
    getCampaignCollaboratorsRequest,
    createCampaignRequest,
    updateCampaignRequest,
} from "../api/campaign.js";
import { getPostsByCampaignRequest, createPostRequest } from "../api/post.js";
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
    const [interestingCampaigns, setInterestingCampaigns] = useState([]);
    const [promoterCampaigns, setPromoterCampaigns] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [campaignCollaborators, setCampaignCollaborators] = useState([]);
    const [campaignPosts, setCampaignPosts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [postErrors, setPostErrors] = useState([]);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 30000);
            return () => clearTimeout(timer);
        }

        if (postErrors.length > 0) {
            const timer = setTimeout(() => {
                setPostErrors([]);
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [errors, postErrors]);

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

    const getInterestingCampaigns = async () => {
        try {
            const res = await getInterestingCampaignsRequest();
            setInterestingCampaigns(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getCampaignsByPromoter = async (id) => {
        try {
            const res = await getCampaignsByPromoterRequest(id);
            setPromoterCampaigns(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const searchCampaigns = async (searchParams) => {
        try {
            const res = await searchCampaignsRequest(searchParams);
            setSearchResults(res.data);
            return res;
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

    const getCampaignCollaborators = async (id) => {
        try {
            const res = await getCampaignCollaboratorsRequest(id);
            setCampaignCollaborators(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createCampaign = async (campaign) => {
        try {
            const res = await createCampaignRequest(campaign);
            setCampaigns([...campaigns, res.data]);
            return res;
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

    const getPostsByCampaign = async (campaignId) => {
        try {
            const res = await getPostsByCampaignRequest(campaignId);
            setCampaignPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createPost = async (post) => {
        try {
            console.log(post);
            const res = await createPostRequest(post);
            setCampaignPosts([...campaignPosts, res.data]);
            return res.status;
        } catch (error) {
            console.error(error);
            setPostErrors(error.response.data);
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
                interestingCampaigns,
                getInterestingCampaigns,
                promoterCampaigns,
                getCampaignsByPromoter,
                searchResults,
                searchCampaigns,
                getCampaign,
                campaignCollaborators,
                getCampaignCollaborators,
                createCampaign,
                eliminateCampaign,
                cancelCampaign,
                completeCampaign,
                campaignPosts,
                getPostsByCampaign,
                createPost,
                errors,
                postErrors,
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
