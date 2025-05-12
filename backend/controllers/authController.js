import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/authModel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/auth.js';

// Register User
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

 
    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Server error, try again later' });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { 
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar, 
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get User Profile
export const getUserProfile = async (req, res) => {
  try {
    
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

   
    return res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    return res.status(500).json({ message: 'Server error, try again later' });
  }
};
