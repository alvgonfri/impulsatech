import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Campaign tests", () => {
    let agent;
    let agentId;

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

        agentId = res.body.user._id;
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
            const futureStartDate = new Date();
            futureStartDate.setDate(futureStartDate.getDate() + 2);
            const futureEndDate = new Date();
            futureEndDate.setDate(futureEndDate.getDate() + 3);

            const response = await agent.post("/api/v1/campaigns").send({
                title: "test",
                description: "test",
                timeGoal: 100,
                timeGoalPeriod: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                financialGoal: 1000,
                iban: "ES123456789123456789",
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

    describe("GET /api/v1/campaigns/ongoing", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns/ongoing");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/completed", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns/completed");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/cancelled", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns/cancelled");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/featured", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns/featured");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/interesting", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/campaigns/interesting");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/promoter/:id", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(
                `/api/v1/campaigns/promoter/${agentId}`
            );
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/campaigns/search", () => {
        it("should return 200 OK", async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const response = await agent.get(
                "/api/v1/campaigns/search?title=test&deadline=" +
                    tomorrow.toISOString().slice(0, 10) +
                    "&financialGoalMin=100&financialGoalMax=1000&timeGoalMin=50&timeGoalMax=200 \
                &moneyRemainingMin=1000&moneyRemainingMax=1500&timeRemainingMin=10&timeRemainingMax=100"
            );
            expect(response.statusCode).toBe(200);
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

    describe("GET /api/v1/campaigns/:id/collaborators", () => {
        it("should return 200 OK", async () => {
            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent.get(
                `/api/v1/campaigns/${campaignId}/collaborators`
            );
            expect(response.statusCode).toBe(200);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.get(
                "/api/v1/campaigns/" + randomObjectId + "/collaborators"
            );
            expect(response.statusCode).toBe(404);
        });
    });

    describe("GET /api/v1/campaigns/:id/donations", () => {
        it("should return 200 OK", async () => {
            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent.get(
                `/api/v1/campaigns/${campaignId}/donations`
            );
            expect(response.statusCode).toBe(200);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.get(
                "/api/v1/campaigns/" + randomObjectId + "/donations"
            );
            expect(response.statusCode).toBe(404);
        });
    });

    describe("PATCH /api/v1/campaigns/update-status", () => {
        it("should return 200 OK", async () => {
            const response = await agent.patch(
                "/api/v1/campaigns/update-status"
            );
            expect(response.statusCode).toBe(200);
        });
    });

    describe("PATCH /api/v1/campaigns/:id", () => {
        it("should return 200 OK", async () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const campaigns = await agent.get("/api/v1/campaigns");
            const campaignId = campaigns.body[0]._id;
            const response = await agent
                .patch(`/api/v1/campaigns/${campaignId}`)
                .send({
                    title: "updated",
                    deadline: tomorrow.toISOString().slice(0, 10),
                });
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
