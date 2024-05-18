import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Post tests", () => {
    let agent;
    let agentId;
    let campaignId;

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);

        const res = await agent.post("/api/v1/register").send({
            name: "post-test",
            surname: "post-test",
            email: "post-test@gmail.com",
            password: "12345678",
        });

        const token = res.body.token;
        agent.set("Authorization", token);

        const campaign = await agent.post("/api/v1/campaigns").send({
            title: "campaign-test",
            description: "campaign-test",
            financialGoal: 1000,
            iban: "ES123456789123456789",
        });

        campaignId = campaign.body._id;

        agentId = res.body.user._id;
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("POST /api/v1/posts", () => {
        it("should return 201 Created", async () => {
            const response = await agent.post("/api/v1/posts").send({
                content: "test",
                campaignId,
            });
            expect(response.statusCode).toBe(201);
        });
    });

    describe("GET /api/v1/posts/:campaignId", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(`/api/v1/posts/${campaignId}`);
            expect(response.statusCode).toBe(200);
        });
    });
});
