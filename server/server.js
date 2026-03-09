const express = require("express");
const cors = require("cors");
const db = require("./db/db");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.use(projectRoutes);

app.get("/", (req, res) => {
res.json({ message: "API running" });
});

const PORT = 4000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});