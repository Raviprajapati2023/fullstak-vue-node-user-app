const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool (configured via environment variables)
const pool = new Pool();

// Auto-create users table on startup
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      description TEXT NOT NULL
    )
  `);
}

// Test route
app.get("/", (req, res) => {
  res.send("Node.js backend is running 🚀");
});

// GET all users
app.get("/api/users", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users ORDER BY id");
  res.json({ success: true, users: rows });
});

// GET single user by id
app.get("/api/users/:id", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  if (rows.length === 0) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  res.json({ success: true, user: rows[0] });
});

// CREATE user
app.post("/api/users", async (req, res) => {
  const { name, age, description } = req.body;

  if (!name || age === undefined || !description) {
    return res
      .status(400)
      .json({ success: false, error: "name, age, and description are required" });
  }

  const { rows } = await pool.query(
    "INSERT INTO users (name, age, description) VALUES ($1, $2, $3) RETURNING *",
    [name, age, description]
  );
  res.status(201).json({ success: true, user: rows[0] });
});

// UPDATE user
app.put("/api/users/:id", async (req, res) => {
  const { name, age, description } = req.body;

  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  if (rows.length === 0) {
    return res.status(404).json({ success: false, error: "User not found" });
  }

  const current = rows[0];
  const updated = await pool.query(
    "UPDATE users SET name = $1, age = $2, description = $3 WHERE id = $4 RETURNING *",
    [
      name !== undefined ? name : current.name,
      age !== undefined ? age : current.age,
      description !== undefined ? description : current.description,
      req.params.id,
    ]
  );
  res.json({ success: true, user: updated.rows[0] });
});

// DELETE user
app.delete("/api/users/:id", async (req, res) => {
  const { rows } = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [req.params.id]
  );
  if (rows.length === 0) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  res.json({ success: true, user: rows[0] });
});

// Initialize DB then start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
    process.exit(1);
  });
