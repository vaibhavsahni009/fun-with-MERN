const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "Mike@something.com",
  password: "DudeWhat56!!",
  tokens: [{ token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("user signup", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Baibhav",
      email: "BaibhavSahni009@random.com",
      password: "MyPass777!",
    })
    .expect(201);
});

test("user login", async () => {
  console.log(userOne.email, userOne.password);
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("user login wrong credentials", async () => {
  console.log(userOne.email, userOne.password);
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password + "notMike",
    })
    .expect(400);
});

test("user profile", async () => {
    console.log(userOne.tokens[0].token)
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});