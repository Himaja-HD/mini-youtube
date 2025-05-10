import jwt from 'jsonwebtoken';

const generateToken = (userId, username, role) => {
  return jwt.sign({ userId, username, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
