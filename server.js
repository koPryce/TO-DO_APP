const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/fontawesome", express.static(__dirname + "/fontawesome"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  completed: { type: Boolean, default: false },
  title: { type: String, required: true },
  task: { type: String },
  priority: { type: String, required: true },
  date: { type: Date },
});

const Task = mongoose.model("Tasks", taskSchema);

app
  .route("/")
  .get(async (req, res) => {
    const { id } = req.query;
    if (id) {
      try {
        const task = await Task.findById(id);
        if (task) {
          const originalDate = String(task.date);
          const parts = originalDate.split(" ");
          const monthIndex = new Date(parts[1] + " 1, 2000").getMonth() + 1;
          const month = monthIndex.toString().padStart(2, "0");
          const day = Number(parts[2]) + 1;
          const year = parts[3];

          const formattedDate = `${year}-${month}-${day}`;

          const formattedTask = {
            ...task._doc,
            date: formattedDate,
          };
          res.json({ action: "get task", task: formattedTask });
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
        const formattedTasks = tasks.map((task) => {
          const originalDate = String(task.date);

          const parts = originalDate.split(" ");
          const monthIndex = new Date(parts[1] + " 1, 2000").getMonth() + 1;
          const month = monthIndex.toString().padStart(2, "0");
          const day = Number(parts[2]) + 1;
          const year = parts[3];

          const formattedDate = `${month}/${day}/${year}`;

          return {
            ...task._doc,
            date: formattedDate,
          };
        });

        formattedTasks.sort((a, b) => {
          if (a.completed && !b.completed) {
            return 1;
          }
          if (!a.completed && b.completed) {
            return -1;
          }
          return 0;
        });

        res.render("index", { action: "get tasks", tasks: formattedTasks });
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
      res.json({ message: "Task added successfully" });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).send("Internal server error");
    }
  })
  .put(async (req, res) => {
    try {
      const { id, title, task, priority, date, completed } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, task, priority, date, completed },
        { new: true }
      );
      if (updatedTask) {
        res.json({ message: "Task updated successfully" });
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
        res.json({ message: "Task deleted successfully" });
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
