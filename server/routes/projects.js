const express = require("express");
const db = require("../db/db");
const auth = require("../middleware/auth");

const router = express.Router();

// Get user's projects
router.get("/projects", auth, (req, res) => {
  const query = `
    SELECT * FROM projects
    WHERE user_id = ?
  `;

  db.all(query, [req.user.id], (err, rows) => {
    res.json(rows);
  });
});

// Create project
router.post("/projects", auth, (req, res) => {
  const { name } = req.body;

  const query = `
    INSERT INTO projects (name, user_id)
    VALUES (?, ?)
  `;

  db.run(query, [name, req.user.id], function () {
    res.json({ id: this.lastID, name });
  });
});

// Delete project
router.delete("/projects/:id", auth, (req, res) => {
  const query = `
    DELETE FROM projects
    WHERE id = ? AND user_id = ?
  `;

  db.run(query, [req.params.id, req.user.id], function () {
    res.json({ success: true });
  });
});

module.exports = router;