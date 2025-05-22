import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'You have access to the protected dashboard',
    user: req.user,
  });
});

export default router;
