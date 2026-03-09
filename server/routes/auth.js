const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const router = express.Router();

const SECRET = "supersecretkey";

// REGISTER
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `;

  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      return res.json({ error: "User already exists" });
    }

    res.json({ message: "User created" });
  });
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (!user) {
      return res.json({ error: "Invalid credentials" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  });
});

module.exports = router;