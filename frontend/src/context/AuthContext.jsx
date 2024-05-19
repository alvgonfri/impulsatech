import { createContext, useContext, useState, useEffect } from "react";
import {
    registerRequest,
    registerOrganizationRequest,
    loginRequest,
} from "../api/auth.js";
import { verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [subject, setSubject] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setSubject(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 30000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user);
            if (res.status === 201) {
                setSubject(res.data.user);
                setIsAuthenticated(true);
                Cookies.set("token", res.data.token, {
                    secure: true,
                    sameSite: "none",
                });
            }
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const signUpOrganization = async (organization) => {
        try {
            const res = await registerOrganizationRequest(organization);
            if (res.status === 201) {
                setSubject(res.data.organization);
                setIsAuthenticated(true);
                Cookies.set("token", res.data.token, {
                    secure: true,
                    sameSite: "none",
                });
            }
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const signIn = async (subject) => {
        try {
            const res = await loginRequest(subject);
            if (res.data.user) setSubject(res.data.user);
            if (res.data.organization) setSubject(res.data.organization);
            setIsAuthenticated(true);
            Cookies.set("token", res.data.token, {
                secure: true,
                sameSite: "none",
            });
        } catch (error) {
            console.error(error);
            setErrors(error.response.data);
        }
    };

    const logOut = () => {
        Cookies.remove("token");
        setSubject(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{
                signUp,
                signUpOrganization,
                signIn,
                logOut,
                subject,
                isAuthenticated,
                loading,
                errors,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthContext;
