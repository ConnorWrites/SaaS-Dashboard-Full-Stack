const express = require("express");
const db = require("../db/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user's projects
router.get("/", auth, (req, res) => {
  const query = `
    SELECT * FROM projects
    WHERE user_id = ?
  `;

  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch projects" });
    }
    res.json(rows);
  });
});

// Create project
router.post("/", auth, (req, res) => {
  const { name } = req.body;

  const query = `
    INSERT INTO projects (name, user_id)
    VALUES (?, ?)
  `;

  db.run(query, [name, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to create project" });
    }
    res.json({ id: this.lastID, name });
  });
});

// Delete project
router.delete("/:id", auth, (req, res) => {
  const query = `
    DELETE FROM projects
    WHERE id = ? AND user_id = ?
  `;

  db.run(query, [req.params.id, req.user.id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Failed to delete project" });
    }
    res.json({ success: true });
  });
});

module.exports = router;