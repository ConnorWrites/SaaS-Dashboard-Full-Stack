const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db/db.js");

const router = express.Router();

const isProd = process.env.NODE_ENV === "production";

router.get("/me", (req, res) => {
  console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET); // Debug log
  console.log("Token present:", !!req.cookies?.token); // Debug log
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ authenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch {
    res.status(401).json({ authenticated: false });
  }
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (email, password)
    VALUES (?, ?)
  `;

  db.run(query, [email, hashedPassword], function (err) {
    if (err) {
      return res.status(400).json({ error: "User already exists" });
    }

const token = jwt.sign(
      { id: this.lastID, email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Registered and logged in" });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ?`;

  db.get(query, [email], (err, user) => {
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,        // required on Render (HTTPS)
      sameSite: isProd ? "none" : "lax",    // required for cross-origin
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Logged in" });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
  });
  res.json({ message: "Logged out" });
});

module.exports = router;