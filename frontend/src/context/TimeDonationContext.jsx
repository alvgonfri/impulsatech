import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    getTimeDonationsByCampaignRequest,
    getTimeToInvestByCollaboratorRequest,
    createTimeDonationRequest,
} from "../api/timeDonation.js";
import { createTimeRecordRequest } from "../api/timeRecord.js";

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
    const [timeToInvest, setTimeToInvest] = useState([]);
    const [errors, setErrors] = useState([]);
    const [timeRecordErrors, setTimeRecordErrors] = useState([]);

    const getTimeDonationsByCampaign = async (campaignId) => {
        try {
            const res = await getTimeDonationsByCampaignRequest(campaignId);
            setTimeDonations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getTimeToInvestByCollaborator = async (collaboratorId) => {
        try {
            const res = await getTimeToInvestByCollaboratorRequest(
                collaboratorId
            );
            setTimeToInvest(res.data);
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

    const createTimeRecord = async (timeRecord) => {
        try {
            const res = await createTimeRecordRequest(timeRecord);
            return res.status;
        } catch (error) {
            console.error(error);
            setTimeRecordErrors(error.response.data);
        }
    };

    return (
        <TimeDonationContext.Provider
            value={{
                timeDonations,
                getTimeDonationsByCampaign,
                timeToInvest,
                getTimeToInvestByCollaborator,
                createTimeDonation,
                createTimeRecord,
                errors,
                timeRecordErrors,
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
