import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './backend/config/db.js';
import authRoutes from './backend/routes/authRoutes.js';
import channelRoutes from './backend/routes/channelRoutes.js';
import searchRoutes from './backend/routes/searchRoutes.js';
import tagRoutes from './backend/routes/tagRoutes.js';
import errorHandler from './backend/middleware/errorHandler.js';

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/channels', channelRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/tags', tagRoutes);

// Frontend 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));
app.use(express.static(path.join(__dirname, 'frontend/public')));
app.get('/', (req, res) => res.render('index'));

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
