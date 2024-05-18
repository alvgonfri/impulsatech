import { createContext, useContext, useState } from "react";
import {
    getFinancialDonationsByCampaignRequest,
    getReinvestmentsByCollaboratorRequest,
    createFinancialDonationRequest,
    processPaymentRequest,
    updateFinancialDonationRequest,
} from "../api/financialDonation.js";
import PropTypes from "prop-types";

const FinancialDonationContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFinancialDonation = () => {
    const context = useContext(FinancialDonationContext);
    if (!context) {
        throw new Error(
            "useFinancialDonation must be used within a FinancialDonationProvider"
        );
    }
    return context;
};

export const FinancialDonationProvider = ({ children }) => {
    const [financialDonations, setFinancialDonations] = useState([]);
    const [collaboratorReinvestments, setCollaboratorReinvestments] = useState(
        []
    );
    const [errors, setErrors] = useState([]);
    const [reinvestmentErrors, setReinvestmentErrors] = useState([]);

    const getFinancialDonationsByCampaign = async (campaignId) => {
        try {
            const res = await getFinancialDonationsByCampaignRequest(
                campaignId
            );
            setFinancialDonations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getReinvestmentsByCollaborator = async (collaboratorId) => {
        try {
            const res = await getReinvestmentsByCollaboratorRequest(
                collaboratorId
            );
            setCollaboratorReinvestments(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createFinancialDonation = async (financialDonation) => {
        try {
            const res = await createFinancialDonationRequest(financialDonation);
            setFinancialDonations([...financialDonations, res.data]);
            return res.data;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const processPayment = async (financialDonation) => {
        try {
            const res = await processPaymentRequest(financialDonation);
            return res.data;
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const reinvestFinancialDonation = async (id, campaignId, anonymous) => {
        try {
            const res = await updateFinancialDonationRequest(id, {
                campaign: campaignId,
                anonymous,
            });
            return res.status;
        } catch (error) {
            console.error(error);
            setReinvestmentErrors(error.response.data);
        }
    };

    return (
        <FinancialDonationContext.Provider
            value={{
                financialDonations,
                getFinancialDonationsByCampaign,
                collaboratorReinvestments,
                getReinvestmentsByCollaborator,
                createFinancialDonation,
                processPayment,
                reinvestFinancialDonation,
                errors,
                reinvestmentErrors,
            }}
        >
            {children}
        </FinancialDonationContext.Provider>
    );
};

FinancialDonationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default FinancialDonationContext;
