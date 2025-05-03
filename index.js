const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
let tasks = [];
let currentId = 1;


app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API. Use Postman to test POST /addTask.');
});


app.post('/addTask', (req, res) => {
  const { taskName } = req.body;

  if (!taskName) {
    return res.status(400).json({ message: "taskName is required" });
  }

  const newTask = { id: currentId++, taskName };
  tasks.push(newTask);
  res.status(201).json({ message: "Task added", task: newTask });
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.delete('/task/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const deletedTask = tasks.splice(index, 1)[0];
  res.json({ message: "Task deleted", task: deletedTask });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



