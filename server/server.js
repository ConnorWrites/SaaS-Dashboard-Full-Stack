// server.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// environment variables
dotenv.config();

// Initialize Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.VITE_API_URL || '*' || 'https://saas-dashboard-s11p.onrender.com', // adjust if you want to restrict frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Serve frontend (React) for all other routes
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});