import jwt from 'jsonwebtoken';

// Generate JWT token and set it as an HTTP-only cookie
const generateToken = (res, userId) => {
  // Create JWT token with user ID and 1-day expiry
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  // Set token in cookie with security options
  res.cookie('jwt', token, {
    httpOnly: true, // Prevent JS access to cookie
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Cross-site handling
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milliseconds
    path: '/', // Cookie is valid across the entire site
  });
};

export default generateToken;
