import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';

const verifyJWT = async (req, res, next) => {
  try {
    // 1. Passport (session-based) authentication
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }

    // 2. JWT-based authentication
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    if (!token) {
      throw new ApiError(401, 'Not authorized, no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      throw new ApiError(401, 'User not found');
    }

    next();
  } catch (err) {
    next(new ApiError(401, 'Unauthorized'));
  }
};

export default verifyJWT;
