import fs from "fs-extra";
import Post from "../models/post.model.js";
import { uploadImage } from "../libs/cloudinary.js";

export const getPostsByCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;

        const posts = await Post.find({ campaign: campaignId });

        posts.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { content, campaignId } = req.body;
        let image;

        if (req.files && req.files.image) {
            const { public_id, secure_url } = await uploadImage(
                req.files.image.tempFilePath,
                "posts"
            );

            await fs.remove(req.files.image.tempFilePath);

            image = { public_id, secure_url };
        }

        const post = new Post({
            content,
            image,
            campaign: campaignId,
        });

        await post.save();

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
