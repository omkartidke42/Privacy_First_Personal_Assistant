import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js'; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/protected', protectedRoutes); 

// Start server
connectDB().then(() => {
  app.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
});
