require("dotenv").config();
const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDataBase = require("../../dataBase");
const app = require("..");
const Platform = require("../../dataBase/models/Platform");
const User = require("../../dataBase/models/User");

let mongoServer;
let userToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionMemoryString = mongoServer.getUri();
  await connectDataBase(connectionMemoryString);

  await User.create({
    name: "Luis",
    username: "luisito13",
    password: "$2b$10$69ISBNYPu8yiIaez3HKrUOfI5Xj4/Qi5myFNyFO2AfHnA6cSUz.GK",
    admin: true,
  });

  await Platform.create({
    name: "Disney minus",
    _id: "6217ceafa37925757491ca2c",
  });

  const { body } = await request(app).post("/users/login").send({
    username: "luisito13",
    password: "iamsecure",
  });

  userToken = body.token;
});

afterEach(async () => {
  await Platform.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Given an endpoint /platforms/id", () => {
  describe("When it receives a DELETE request when the user is logged and has a token", () => {
    test("Then it should respond with status 200 and a deleted platforms", async () => {
      const platformToBeDeleted = await Platform.findOne();

      await request(app)
        .delete(`/platforms/${platformToBeDeleted.id}`)
        .set("Authorization", `Bearer ${userToken}`)
        .expect(200);
    });
  });
});
