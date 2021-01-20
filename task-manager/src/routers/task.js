const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.get("/tasks", auth, async (req, res) => {
  const match = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  try {
    const tasks = await Task.find({
      owner: req.user._id,
      ...match,
    });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
  // Task.find({}).then(
  //     (tasks)=>{
  //         res.send(tasks)
  //     }).catch((e)=>{
  //         res.status(500).send()
  //     })
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.findById(req.params.id).then((task)=>{
  //     if(!task){
  //         return res.status(404).send()
  //     }
  //     res.send(task)
  // }).catch((e)=>{
  //     res.status(500).send()
  // })
});

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body)
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }

  // task.save().then(
  //     ()=>{res.status(201).send(task)}
  //     ).catch((e)=>{
  //             res.status(400).send(e)}
  //         )

  // res.send('testing')
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid Updates!",
    });
  }

  try {
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //     new: true,
    //     runValidators: true
    // })

    // const task = await Task.findById(req.params.id);

    const task = await Task.findOne({
      owner: req.user._id,
      _id: req.params.id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
