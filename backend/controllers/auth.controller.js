import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
    const { name, surname, email, password, phone, picture, bio } = req.body;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            surname,
            email,
            password: passwordHash,
            phone,
            picture,
            bio,
        });

        const userSaved = await newUser.save();

        const token = await createAccessToken({ id: userSaved._id });

        res.status(201).json({
            user: {
                _id: userSaved._id,
                name: userSaved.name,
                surname: userSaved.surname,
                email: userSaved.email,
                phone: userSaved.phone,
                picture: userSaved.picture,
                bio: userSaved.bio,
                createdAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({
            email,
        });

        if (!userFound) {
            return res.status(400).json(["Credenciales incorrectas"]);
        }

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json(["Credenciales incorrectas"]);
        }

        const token = await createAccessToken({ id: userFound._id });

        res.status(200).json({
            user: {
                _id: userFound._id,
                name: userFound.name,
                surname: userFound.surname,
                email: userFound.email,
                phone: userFound.phone,
                picture: userFound.picture,
                bio: userFound.bio,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.sendStatus(400).json({ token: token });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound._id,
            name: userFound.name,
            surname: userFound.surname,
            email: userFound.email,
            phone: userFound.phone,
            picture: userFound.picture,
            bio: userFound.bio,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    });
};
