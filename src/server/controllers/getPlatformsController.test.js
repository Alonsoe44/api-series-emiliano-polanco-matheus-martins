require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectDataBase = require("../../dataBase");
const Platform = require("../../dataBase/models/Platform");
const getPlatformsController = require("./getPlatformsController");

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

describe("Given a getPlatforms controller", () => {
  describe("When it's called with res", () => {
    test("Then it should call method res.json", async () => {
      const dataBasePlatform = {
        name: "Dexter",
      };

      Platform.find = jest.fn().mockResolvedValue(dataBasePlatform);
      const platforms = await Platform.find();

      const res = {
        status: jest.fn().mockImplementation(() => res),
        json: jest.fn(),
      };

      const req = null;
      const next = null;

      await getPlatformsController(req, res, next);

      expect(res.json).toHaveBeenCalledWith({ platforms });
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
