// controllers/authController.ts
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET;


export const registerUser = async (req,res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;

    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    // 4. Create and save user
    const newUser = new User({
      userName,
      userEmail,
      userPassword: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const createAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
};

const createRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const user = await User.findOne({ userEmail });
  if (!user) return res.status(401).json({ message: 'Invalid email' });

  const isMatch = await bcrypt.compare(userPassword, user.userPassword);
  if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  // Set cookies
  res.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      email: user.userEmail,
      name: user.userName,
    },
  });
};
