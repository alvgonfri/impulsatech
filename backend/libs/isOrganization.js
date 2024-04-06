import Organization from "../models/organization.model.js";

export async function isOrganization(id) {
    try {
        const organization = await Organization.findById(id);
        return organization;
    } catch (error) {
        console.error(error);
    }
}
