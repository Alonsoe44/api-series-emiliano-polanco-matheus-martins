require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectDataBase = require("../../dataBase");
const Platform = require("../../dataBase/models/Platform");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);
});

beforeEach(async () => {
  await Platform.create({
    name: "Netflix",
  });
});

afterEach(async () => {
  await Platform.deleteMany({});
});

describe("Given a /platforms endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get("/platforms/").expect(200);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
