import User from "../models/user.model.js";
import Organization from "../models/organization.model.js";

export async function checkIfEmailExists(email) {
    try {
        const user = await User.findOne({ email });
        const organization = await Organization.findOne({ email });

        return user || organization;
    } catch (error) {
        console.error(error);
    }
}

export async function checkIfDateIsFuture(date) {
    try {
        const deadline = new Date(date).toISOString().slice(0, 10);
        return deadline > new Date().toISOString().slice(0, 10);
    } catch (error) {
        console.error(error);
    }
}
