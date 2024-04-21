import jwt, { decode } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token)
            return res
                .status(401)
                .json({ message: "Se requiere autenticación" });

        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                return res
                    .status(401)
                    .json({ message: "Se requiere autenticación" });
            }
            req.subject = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const validateToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            req.subject = null;
            return next();
        }

        jwt.verify(token, TOKEN_SECRET, (error, decoded) => {
            if (error) {
                req.subject = null;
                return next();
            }
            req.subject = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
