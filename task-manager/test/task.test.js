const { send } = require("@sendgrid/mail");
const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const {
  userOneId,
  userOne,
  setupDatabase,
  userTwo,
  userTwoId,
  taskOne,
} = require("./fixtures/db");

beforeEach(setupDatabase);

test("task creation", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "test task",
    })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task.description).toBe("test task");
  expect(task.completed).toBe(false);
});

test("task for a user", async () => {
  const response = await request(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test("delete task of another user", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
