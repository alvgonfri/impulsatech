import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Campaign tests", () => {
    let agent;

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);
        const res = await agent.post("/api/v1/register").send({
            name: "campaign-test",
            surname: "campaign-test",
            email: "campaign-test@gmail.com",
            password: "12345678",
        });
        const token = res.body.token;
        agent.set("Authorization", token);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("GET /api/v1/campaigns", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("POST /api/v1/campaigns", () => {
        it("should return 201 Created", async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const response = await agent.post("/api/v1/campaigns").send({
                title: "test",
                description: "test",
                timeGoal: 100,
                financialGoal: 1000,
                deadline: tomorrow.toISOString().slice(0, 10),
            });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request", async () => {
            const response = await agent.post("/api/v1/campaigns").send({
                title: "test",
                description: "test",
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("GET /api/v1/campaigns/:id", () => {
        it("should return 200 OK", async () => {
            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent.get(`/api/v1/campaigns/${campaignId}`);
            expect(response.statusCode).toBe(200);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.get(
                "/api/v1/campaigns/" + randomObjectId
            );
            expect(response.statusCode).toBe(404);
        });
    });

    describe("PATCH /api/v1/campaigns/:id", () => {
        it("should return 200 OK", async () => {
            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent
                .patch(`/api/v1/campaigns/${campaignId}`)
                .send({ title: "updated" });
            expect(response.statusCode).toBe(200);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.patch(
                "/api/v1/campaigns/" + randomObjectId
            );
            expect(response.statusCode).toBe(404);
        });
    });

    describe("DELETE /api/v1/campaigns/:id", () => {
        it("should return 200 OK", async () => {
            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent.delete(
                `/api/v1/campaigns/${campaignId}`
            );
            expect(response.statusCode).toBe(204);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.delete(
                "/api/v1/campaigns/" + randomObjectId
            );
            expect(response.statusCode).toBe(404);
        });
    });
});
