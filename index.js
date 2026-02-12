const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let todos = [];

// Home page
app.get("/", (req, res) => {
  let list = todos.map((t, i) => `
    <li>
      <span>${t}</span>
      <div class="actions">
        <a class="edit" href="/edit/${i}">Edit</a>
        <a class="delete" href="/delete/${i}">Delete</a>
      </div>
    </li>
  `).join("");

  res.send(`
  <html>
  <head>
    <title>Todo App</title>
    <style>
      :root {
        --bg: #0f172a;        /* dark blue */
        --card: #111827;      /* dark gray */
        --primary: #38bdf8;   /* sky blue */
        --success: #22c55e;   /* green */
        --danger: #ef4444;    /* red */
        --text: #e5e7eb;      /* light gray */
        --muted: #9ca3af;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: var(--text);
      }

      .box {
        background: var(--card);
        padding: 20px;
        border-radius: 14px;
        width: 380px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      }

      h2 {
        text-align: center;
        color: var(--primary);
        margin-bottom: 15px;
      }

      form {
        display: flex;
        gap: 6px;
        margin-bottom: 15px;
      }

      input {
        flex: 1;
        padding: 10px;
        border-radius: 8px;
        border: none;
        outline: none;
        background: #020617;
        color: var(--text);
      }

      button {
        padding: 10px 14px;
        background: var(--primary);
        border: none;
        border-radius: 8px;
        color: #020617;
        font-weight: bold;
        cursor: pointer;
      }

      button:hover {
        background: #0ea5e9;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        background: #020617;
        margin: 6px 0;
        padding: 10px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions a {
        margin-left: 6px;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 6px;
        font-size: 13px;
      }

      .edit {
        background: var(--success);
        color: #052e16;
      }

      .delete {
        background: var(--danger);
        color: #450a0a;
      }

      .edit:hover { opacity: 0.8; }
      .delete:hover { opacity: 0.8; }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>✅ Todo App</h2>

      <form action="/add" method="POST">
        <input type="text" name="task" placeholder="Enter your task" required>
        <button>Add</button>
      </form>

      <ul>
        ${list}
      </ul>
    </div>
  </body>
  </html>
  `);
});

// Add todo
app.post("/add", (req, res) => {
  todos.push(req.body.task);
  res.redirect("/");
});

// Edit page
app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const task = todos[id];

  res.send(`
  <html>
  <head>
    <title>Edit Todo</title>
    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        color: #e5e7eb;
      }

      .box {
        background: #111827;
        padding: 20px;
        border-radius: 14px;
        width: 350px;
        text-align: center;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      }

      h2 {
        color: #38bdf8;
        margin-bottom: 10px;
      }

      input {
        width: 100%;
        padding: 10px;
        border-radius: 8px;
        border: none;
        outline: none;
        background: #020617;
        color: #e5e7eb;
        margin-bottom: 10px;
      }

      button {
        padding: 10px 14px;
        background: #22c55e;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
      }

      button:hover {
        background: #16a34a;
      }

      a {
        display: block;
        margin-top: 10px;
        color: #38bdf8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>Edit Task</h2>
      <form action="/update/${id}" method="POST">
        <input type="text" name="task" value="${task}" required>
        <button>Update</button>
      </form>
      <a href="/">⬅ Back</a>
    </div>
  </body>
  </html>
  `);
});

// Update todo
app.post("/update/:id", (req, res) => {
  const id = req.params.id;
  todos[id] = req.body.task;
  res.redirect("/");
});

// Delete todo
app.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  res.redirect("/");
});

app.listen(3000, '0.0.0.0', () => {
  console.log("Todo App running on http://40.192.89.12:3000");
});
