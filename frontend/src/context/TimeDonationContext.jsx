import { createContext, useContext, useState } from "react";
import {
    getTimeDonationsByCampaignRequest,
    createTimeDonationRequest,
} from "../api/timeDonation.js";
import PropTypes from "prop-types";

const TimeDonationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTimeDonation = () => {
    const context = useContext(TimeDonationContext);
    if (!context) {
        throw new Error(
            "useTimeDonation must be used within a TimeDonationProvider"
        );
    }
    return context;
};

export const TimeDonationProvider = ({ children }) => {
    const [timeDonations, setTimeDonations] = useState([]);
    const [errors, setErrors] = useState([]);

    const getTimeDonationsByCampaign = async (campaignId) => {
        try {
            const res = await getTimeDonationsByCampaignRequest(campaignId);
            setTimeDonations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTimeDonation = async (timeDonation) => {
        try {
            const res = await createTimeDonationRequest(timeDonation);
            setTimeDonations([...timeDonations, res.data]);
            return res.status;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    return (
        <TimeDonationContext.Provider
            value={{
                timeDonations,
                getTimeDonationsByCampaign,
                createTimeDonation,
                errors,
            }}
        >
            {children}
        </TimeDonationContext.Provider>
    );
};

TimeDonationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default TimeDonationContext;
