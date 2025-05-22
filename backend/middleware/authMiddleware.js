import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key_here';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  // Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // attach user info to request
    next();
  });
};
