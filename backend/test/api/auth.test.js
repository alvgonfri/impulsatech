import request from "supertest";
import app from "../../app.js";
import mongoose from "mongoose";

describe("Auth tests", () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.TEST_MONGODB_URI);
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    describe("POST /api/v1/register", () => {
        it("should return 201 Created", async () => {
            const response = await request(app).post("/api/v1/register").send({
                name: "test",
                surname: "test",
                email: "test@gmail.com",
                password: "12345678",
            });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request", async () => {
            const response = await request(app).post("/api/v1/register").send({
                name: "test",
                surname: "test",
                email: "notvalidemail",
                password: "12345678",
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("POST /api/v1/register-organization", () => {
        it("should return 201 Created", async () => {
            const response = await request(app)
                .post("/api/v1/register-organization")
                .send({
                    name: "test_org",
                    email: "test_org@gmail.com",
                    password: "12345678",
                });
            expect(response.statusCode).toBe(201);
        });

        it("should return 400 Bad Request", async () => {
            const response = await request(app)
                .post("/api/v1/register-organization")
                .send({
                    name: "new_test_org",
                    email: "new_test_org@gmail.com",
                    password: "short",
                });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("POST /api/v1/login", () => {
        it("should return 200 OK", async () => {
            const response = await request(app).post("/api/v1/login").send({
                email: "test@gmail.com",
                password: "12345678",
            });
            expect(response.statusCode).toBe(200);
        });

        it("should return 200 OK", async () => {
            const response = await request(app).post("/api/v1/login").send({
                email: "test_org@gmail.com",
                password: "12345678",
            });
            expect(response.statusCode).toBe(200);
        });

        it("should return 400 Bad Request", async () => {
            const response = await request(app).post("/api/v1/login").send({
                email: "test@gmail.com",
                password: "wrongpassword",
            });
            expect(response.statusCode).toBe(400);
        });

        it("should return 400 Bad Request", async () => {
            const response = await request(app).post("/api/v1/login").send({
                email: "test_org@gmail.com",
                password: "wrongpassword",
            });
            expect(response.statusCode).toBe(400);
        });
    });

    describe("POST /api/v1/logout", () => {
        it("should return 200 OK", async () => {
            const response = await request(app).post("/api/v1/logout");
            expect(response.statusCode).toBe(200);
        });
    });
});
