const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const todos = []; // In-memory storage (simple for now)


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'backend is running!' });
});

app.get('/api/healthcheck', (req, res) => {
  res.json({ status: 'OK', message: 'LATEST UPDATED CODE!' });
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json({ status: 'OK', data: todos, message: 'Hello Todos Data Fetched' });
});

// Create todo
app.post('/api/todos', (req, res) => {

  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Hello  Title is required' });

  const todo = { id: Date.now(), title, completed: false };
  todos.push(todo);
  res.status(201).json({ status: 'OK', data: todo, message: 'Todos Record Saved' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Basic Backend running on http://0.0.0.0:${PORT}`);
});