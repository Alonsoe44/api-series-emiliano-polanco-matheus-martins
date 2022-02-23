require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../dataBase");
const Serie = require("../../dataBase/models/Serie");
const app = require("..");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);
});

beforeEach(async () => {
  await Serie.create({
    name: "Hawkeye",
  });
});

afterEach(async () => {
  await Serie.deleteMany({});
});

describe("Given a /series endpoint", () => {
  describe("When it receives a GET request", () => {
    test("Then it should reply with a 200 status code", async () => {
      await request(app).get("/series/").expect(200);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
