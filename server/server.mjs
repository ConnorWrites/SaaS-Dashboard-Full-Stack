import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: true, // adjust if you want to restrict frontend origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next(); // If the request is for the API, continue to the next middleware
  }
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});