import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Time Donation tests", () => {
    let agent;
    let agentId;
    let campaignId;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const futureStartDate = new Date();
    futureStartDate.setDate(futureStartDate.getDate() + 2);
    const futureEndDate = new Date();
    futureEndDate.setDate(futureEndDate.getDate() + 3);

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);

        const res = await agent.post("/api/v1/register").send({
            name: "timeDonation-test",
            surname: "timeDonation-test",
            email: "timeDonation-test@gmail.com",
            password: "12345678",
        });

        const token = res.body.token;
        agent.set("Authorization", token);

        await agent.post("/api/v1/campaigns").send({
            title: "campaign-test",
            description: "campaign-test",
            timeGoal: 100,
            timeGoalPeriod: {
                startDate: futureStartDate.toISOString().slice(0, 10),
                endDate: futureEndDate.toISOString().slice(0, 10),
            },
            deadline: tomorrow.toISOString().slice(0, 10),
        });

        const campaign = await agent.get("/api/v1/campaigns");
        campaignId = campaign.body[0]._id;

        agentId = res.body.user._id;
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("POST /api/v1/time-donations", () => {
        it("should return 400 Bad Request because you cannot donate to your own campaign", async () => {
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 10,
                period: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(400);
        });

        it("should return 201 Created", async () => {
            const other = await agent.post("/api/v1/register").send({
                name: "other-test",
                surname: "other-test",
                email: "other-test@gmail.com",
                password: "12345678",
            });

            const otherToken = other.body.token;
            agent.set("Authorization", otherToken);

            const response = await agent.post("/api/v1/time-donations").send({
                amount: 10,
                period: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request because amount is 0", async () => {
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 0,
                period: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(400);
        });

        it("should return 404 Not Found because campaign does not exist", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 10,
                period: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: randomObjectId,
            });
            expect(response.statusCode).toBe(404);
        });

        it("should return 400 Bad Request because start date is after end date", async () => {
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 10,
                period: {
                    startDate: futureEndDate.toISOString().slice(0, 10),
                    endDate: futureStartDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 Bad Request because the donation period is not within the campaign period", async () => {
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 10,
                period: {
                    startDate: tomorrow.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 Bad Request because amount is greater than the hours of the period", async () => {
            const response = await agent.post("/api/v1/time-donations").send({
                amount: 49,
                period: {
                    startDate: futureStartDate.toISOString().slice(0, 10),
                    endDate: futureEndDate.toISOString().slice(0, 10),
                },
                campaignId: campaignId,
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("GET /api/v1/time-donations/:campaignId", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(
                `/api/v1/time-donations/${campaignId}`
            );
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/time-donations/invest/:collaboratorId", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(
                `/api/v1/time-donations/invest/${agentId}`
            );
            expect(response.statusCode).toBe(200);
        });
    });
});
