import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Subject tests", () => {
    let agent;
    let agentId;

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);

        const res = await agent.post("/api/v1/register").send({
            name: "subject-test",
            surname: "subject-test",
            email: "subject-test@gmail.com",
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

    describe("GET /api/v1/subjects/:id", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(`/api/v1/subjects/${agentId}`);
            expect(response.statusCode).toBe(200);
        });

        it("should return 404 Not Found", async () => {
            const randomObjectId = new mongoose.Types.ObjectId();
            const response = await agent.get(
                `/api/v1/subjects/${randomObjectId}`
            );
            expect(response.statusCode).toBe(404);
        });
    });

    describe("GET /api/v1/subjects/:id/donations", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get(
                `/api/v1/subjects/${agentId}/donations`
            );
            expect(response.statusCode).toBe(200);
        });
    });
});
