import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Stats tests", () => {
    let agent;

    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);

        agent = request.agent(app);

        const res = await agent.post("/api/v1/register").send({
            name: "stats-test",
            surname: "stats-test",
            email: "stats-test@gmail.com",
            password: "12345678",
        });

        const token = res.body.token;
        agent.set("Authorization", token);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("GET /api/v1/stats/campaigns", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/stats/campaigns");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/stats/tags", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/stats/tags");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/stats/financial", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/stats/financial");
            expect(response.statusCode).toBe(200);
        });
    });

    describe("GET /api/v1/stats/time", () => {
        it("should return 200 OK", async () => {
            const response = await agent.get("/api/v1/stats/time");
            expect(response.statusCode).toBe(200);
        });
    });
});
