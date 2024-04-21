import dotenv from "dotenv";
import stripePackage from "stripe";

dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET;

export const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY);
