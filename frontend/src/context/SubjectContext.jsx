import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { getDonationsBySubjectRequest } from "../api/subject.js";

const SubjectContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSubject = () => {
    const context = useContext(SubjectContext);
    if (!context) {
        throw new Error("useSubject must be used within a SubjectProvider");
    }
    return context;
};

export const SubjectProvider = ({ children }) => {
    const [subjectDonations, setSubjectDonations] = useState([]);

    const getDonationsBySubject = async (id) => {
        try {
            const res = await getDonationsBySubjectRequest(id);
            setSubjectDonations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SubjectContext.Provider
            value={{
                subjectDonations,
                getDonationsBySubject,
            }}
        >
            {children}
        </SubjectContext.Provider>
    );
};

SubjectProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SubjectContext;
