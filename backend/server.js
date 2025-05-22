// server.ts
import express from "express";
import cors from "cors"; // <-- Import CORS
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for React Native (usually runs on localhost:8081)
app.use(
  cors({
    origin: "http://localhost:8081",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Connect DB and start server
connectDB().then(() => {
  app.listen(3000, '0.0.0.0', () => {
    console.log("Server running on http://0.0.0.0:3000");
  });
});
