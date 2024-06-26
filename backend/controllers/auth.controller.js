import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import { uploadImage } from "../libs/cloudinary.js";

export const register = async (req, res) => {
    const { name, surname, email, password, phone, bio } = req.body;
    let picture;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        if (req.files && req.files.picture) {
            const { public_id, secure_url } = await uploadImage(
                req.files.picture.tempFilePath,
                "users"
            );

            await fs.remove(req.files.picture.tempFilePath);

            picture = { public_id, secure_url };
        }

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

export const registerOrganization = async (req, res) => {
    const { name, email, password, phone, bio } = req.body;
    let picture;

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        if (req.files && req.files.picture) {
            const { public_id, secure_url } = await uploadImage(
                req.files.picture.tempFilePath,
                "organizations"
            );

            await fs.remove(req.files.picture.tempFilePath);

            picture = { public_id, secure_url };
        }

        const newOrganization = await Organization.create({
            name,
            email,
            password: passwordHash,
            phone,
            picture,
            bio,
        });

        const organizationSaved = await newOrganization.save();

        const token = await createAccessToken({ id: organizationSaved._id });

        res.status(201).json({
            organization: {
                _id: organizationSaved._id,
                name: organizationSaved.name,
                email: organizationSaved.email,
                phone: organizationSaved.phone,
                picture: organizationSaved.picture,
                bio: organizationSaved.bio,
                createdAt: organizationSaved.createdAt,
                updatedAt: organizationSaved.updatedAt,
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

        const organizationFound = await Organization.findOne({
            email,
        });

        if (!userFound && !organizationFound) {
            return res.status(400).json(["Credenciales incorrectas"]);
        }

        if (userFound) {
            const isMatch = await bcrypt.compare(password, userFound.password);

            if (!isMatch) {
                return res.status(400).json(["Credenciales incorrectas"]);
            }

            const token = await createAccessToken({ id: userFound._id });

            return res.status(200).json({
                user: {
                    _id: userFound._id,
                    name: userFound.name,
                    surname: userFound.surname,
                    email: userFound.email,
                    isAdmin: userFound.isAdmin,
                    phone: userFound.phone,
                    picture: userFound.picture,
                    bio: userFound.bio,
                    createdAt: userFound.createdAt,
                    updatedAt: userFound.updatedAt,
                },
                token,
            });
        }

        if (organizationFound) {
            const isMatch = await bcrypt.compare(
                password,
                organizationFound.password
            );

            if (!isMatch) {
                return res.status(400).json(["Credenciales incorrectas"]);
            }

            const token = await createAccessToken({
                id: organizationFound._id,
            });

            return res.status(200).json({
                organization: {
                    _id: organizationFound._id,
                    name: organizationFound.name,
                    email: organizationFound.email,
                    phone: organizationFound.phone,
                    picture: organizationFound.picture,
                    bio: organizationFound.bio,
                    createdAt: organizationFound.createdAt,
                    updatedAt: organizationFound.updatedAt,
                },
                token,
            });
        }
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
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ token: token });

    jwt.verify(token, TOKEN_SECRET, async (error, decoded) => {
        if (error) return res.sendStatus(401);

        const userFound = await User.findById(decoded.id);

        const organizationFound = await Organization.findById(decoded.id);

        if (!userFound && !organizationFound) return res.sendStatus(401);

        if (userFound) {
            return res.status(200).json({
                _id: userFound._id,
                name: userFound.name,
                surname: userFound.surname,
                email: userFound.email,
                isAdmin: userFound.isAdmin,
                phone: userFound.phone,
                picture: userFound.picture,
                bio: userFound.bio,
                createdAt: userFound.createdAt,
                updatedAt: userFound.updatedAt,
            });
        }

        if (organizationFound) {
            return res.status(200).json({
                _id: organizationFound._id,
                name: organizationFound.name,
                email: organizationFound.email,
                phone: organizationFound.phone,
                picture: organizationFound.picture,
                bio: organizationFound.bio,
                createdAt: organizationFound.createdAt,
                updatedAt: organizationFound.updatedAt,
            });
        }
    });
};
