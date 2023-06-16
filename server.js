const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/fontawesome", express.static(__dirname + "/fontawesome"));

const connectionString = "mongodb://0.0.0.0:27017/ToDoIt";
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  task: { type: String },
  priority: { type: String, required: true },
  date: { type: Date },
});

const Task = mongoose.model("Tasks", taskSchema);

app
  .route("/")
  .get(async (req, res) => {
    const taskId = req.query.id;
    if (taskId) {
      try {
        const task = await Task.findById(taskId);
        if (task) {
          res.render("index", { action: "get task", task });
        } else {
          res.status(404).send("Task not found");
        }
      } catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).send("Internal server error");
      }
    } else {
      try {
        const tasks = await Task.find({});
        res.render("index", { action: "get tasks", tasks });
      } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).send("Internal server error");
      }
    }
  })
  .post(async (req, res) => {
    try {
      const { title, task, priority, date } = req.body;
      const newTask = new Task({ title, task, priority, date });
      const value = await newTask.save();
      res.render("index", { action: "added", value });
      res.redirect("/");
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Internal server error");
    }
  })
  .put(async (req, res) => {
    try {
      const { id, title, task, priority, date } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, task, priority, date },
        { new: true }
      );
      if (updatedTask) {
        res.render("index", { action: "updated", task: updatedTask });
      } else {
        res.status(404).send("Task not found");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).send("Internal server error");
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.body;
      const deletedTask = await Task.findByIdAndDelete(id);
      if (deletedTask) {
        res.render("index", { action: "deleted" });
      } else {
        res.status(404).send("Task not found");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).send("Internal server error");
    }
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
