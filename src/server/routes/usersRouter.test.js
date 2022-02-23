const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const connectDataBase = require("../../dataBase");
const User = require("../../dataBase/models/User");
const app = require("../index");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await connectDataBase(connectionString);

  User.create({
    username: "normalUser",
    password: "$2b$10$mKBXw7GhooAwOTySr8HOFODbxJse18IfwLGB3BgfadhtzGYXyAPvS",
    name: "iamaName",
    admin: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given a /users/login endpoint", () => {
  describe("When it receive invalid credentials", () => {
    test("Then it shouldn't return a token", async () => {
      const userCredentials = {
        username: "elpapu",
        password: "iampass",
      };

      const { body } = await request(app)
        .post("/users/login")
        .send(userCredentials)
        .expect(401);

      expect(body).not.toHaveProperty("token");
    });
  });

  describe("When it receive valid credentials", () => {
    test("Then it should return a token", async () => {
      const userCredentials = {
        username: "normalUser",
        password: "iamsecure",
      };

      const {
        body: { token },
      } = await request(app)
        .post("/users/login")
        .send(userCredentials)
        .expect(200);

      expect(token).toBeTruthy();
    });
  });
});
