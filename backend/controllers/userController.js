import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Channel from '../models/channelModel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/auth.js';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error.message);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Login user and issue JWT
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    const channel = await Channel.findOne({ owner: user._id });

    res.status(200).json({
      token,
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        hasChannel: !!channel,
        channelHandle: channel?.handle || null,
      },
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Logout user 
export const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Get logged-in user's profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};

// Update logged-in user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        userId: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    console.error('Update Profile Error:', error.message);
    res.status(500).json({ message: 'Server error, try again later' });
  }
};
