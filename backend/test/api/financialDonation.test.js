import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Financial Donation tests", () => {
    let agent;
    let campaignId;

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);

        const res = await agent.post("/api/v1/register").send({
            name: "financialDonation-test",
            surname: "financialDonation-test",
            email: "financialDonation-test@gmail.com",
            password: "12345678",
        });

        const token = res.body.token;
        agent.set("Authorization", token);

        await agent.post("/api/v1/campaigns").send({
            title: "campaign-test",
            description: "campaign-test",
            financialGoal: 1000,
            iban: "ES123456789123456789",
        });

        const campaign = await agent.get("/api/v1/campaigns");
        campaignId = campaign.body[0]._id;
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("POST /api/v1/financial-donations", () => {
        it("should return 201 Created", async () => {
            const other = await agent.post("/api/v1/register").send({
                name: "other-test",
                surname: "other-test",
                email: "other-test@gmail.com",
                password: "12345678",
            });

            const otherToken = other.body.token;
            agent.set("Authorization", otherToken);

            const response = await agent
                .post("/api/v1/financial-donations")
                .send({
                    amount: 100,
                    anonymous: false,
                    campaignId: campaignId,
                });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request", async () => {
            const response = await agent
                .post("/api/v1/financial-donations")
                .send({
                    amount: 0,
                    anonymous: false,
                    campaignId: campaignId,
                });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("GET /api/v1/financial-donations/campaign/:id", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(
                `/api/v1/financial-donations/${campaignId}`
            );
            expect(response.statusCode).toBe(200);
        });
    });

    describe("POST /api/v1/financial-donations/process-payment", () => {
        it("should return 201 Created", async () => {
            const response = await agent
                .post("/api/v1/financial-donations/process-payment")
                .send({
                    amount: 100,
                    anonymous: false,
                    campaignId: campaignId,
                });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request", async () => {
            const response = await agent
                .post("/api/v1/financial-donations/process-payment")
                .send({
                    amount: 0,
                    anonymous: false,
                    campaignId: campaignId,
                });
            expect(response.statusCode).toBe(400);
        });
    });
});