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
          res.json({ action: "get task", task });
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
        const formattedTasks = tasks.map(task => {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          }).format(task.date);
    
          return {
            ...task._doc,
            date: formattedDate,
          };
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
      const { id, title, task, priority, date } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, task, priority, date },
        { new: true }
      );
      if (updatedTask) {
        // res.render("index", { action: "updated", task: updatedTask });
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
