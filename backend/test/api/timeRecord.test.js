import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";
import TimeDonation from "../../models/timeDonation.model.js";

describe("Time Record tests", () => {
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
            name: "timeRecord-test",
            surname: "timeRecord-test",
            email: "timeRecord-test@gmail.com",
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

    describe("POST /api/v1/time-records", () => {
        it("should return 201 Created", async () => {
            const other = await agent.post("/api/v1/register").send({
                name: "other-test",
                surname: "other-test",
                email: "other-test@gmail.com",
                password: "12345678",
            });

            const otherToken = other.body.token;
            agent.set("Authorization", otherToken);

            const timeDonation = await agent
                .post("/api/v1/time-donations")
                .send({
                    amount: 10,
                    period: {
                        startDate: futureStartDate.toISOString().slice(0, 10),
                        endDate: futureEndDate.toISOString().slice(0, 10),
                    },
                    campaignId: campaignId,
                });

            const timeDonationId = timeDonation.body._id;

            const response = await agent.post("/api/v1/time-records").send({
                amount: 5,
                date: futureStartDate.toISOString().slice(0, 10),
                description: "test",
                timeDonationId: timeDonationId,
            });
            expect(response.statusCode).toBe(201);
        });
    });
});
