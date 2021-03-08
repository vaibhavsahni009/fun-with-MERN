const request = require("supertest");
const app = require("../src/app");
const Task = require("../src/models/task");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

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
