import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import session from 'express-session';
import passport from 'passport';
import './backend/config/passport.js';

import connectDB from './backend/config/db.js';
import authRoutes from './backend/routes/authRoutes.js';
import channelRoutes from './backend/routes/channelRoutes.js'; 
import protect from './backend/middleware/authMiddleware.js';
import errorHandler from './backend/middleware/errorHandler.js'; 
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions + Passport
app.use(session({
  secret: 'your_secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
connectDB();

// ========== BACKEND ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api/channels', channelRoutes);

// Protected test route
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});

// ========== FRONTEND ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/views'));
app.use(express.static(path.join(__dirname, 'frontend/public')));

app.get('/', (req, res) => {
  res.render('index');
});

// Global error handler 
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
