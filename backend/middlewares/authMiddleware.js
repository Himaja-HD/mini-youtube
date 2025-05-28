import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { JWT_SECRET } from '../config/auth.js';
import User from '../models/userModel.js';

// Middleware to protect routes by verifying JWT token
const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get auth header

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]; // Extract token

    try {
      const decoded = jwt.verify(token, JWT_SECRET); // Verify token
      console.log('Decoded token:', decoded);

      const userId = decoded.userId;

      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(401).json({ message: 'Invalid user ID in token' });
      }

      const user = await User.findById(userId).select('-password'); // Fetch user

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      req.user = user; // Attach user to request
      next(); // Proceed to next middleware
    } catch (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' }); // No auth header
  }
};

export default protect;
