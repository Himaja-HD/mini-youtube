import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import protect from './middleware/authMiddleware.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect DB
connectDB();

// route
app.use('/api/auth', authRoutes);

// protected route
app.get('/api/protected', protect, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
