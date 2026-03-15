require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

const app = express();

app.set("trust proxy", 1); // Trust first proxy for secure cookies in production

app.use(
  cors({
    origin: "https://saas-dashboard-full-stack-1.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(projectRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// ✅ Render-compatible port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});