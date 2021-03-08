const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const {userOneId,userOne,setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase);

test("user signup", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Baibhav",
      email: "BaibhavSahni009@random.com",
      password: "MyPass777!",
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "Baibhav",
      email: "BaibhavSahni009@random.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("MyPass777!");
});

test("user login", async () => {
  //   console.log(userOne.email, userOne.password);
  const response = await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("user login wrong credentials", async () => {
  // console.log(userOne.email, userOne.password);
  await request(app)
    .post("/user/login")
    .send({
      email: userOne.email,
      password: userOne.password + "notMike",
    })
    .expect(400);
});

test("user profile", async () => {
  // console.log(userOne.tokens[0].token)
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("user profile unauthenticated", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("user profile deletion", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);

  expect(user).toBeNull();
});

test("user profile deletion unauthenticated", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("user avatar upload", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "test/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("update user info", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "Mike Buttowski" })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toBe('Mike Buttowski')
});

test("Invalid update field",async()=>{
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ notValid: "Invalid" })
    .expect(400);
})