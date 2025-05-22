// routes/authRoutes.ts
import express from "express";
import { login, registerUser } from "../controller/authController.js";

const router = express.Router();


router.post("/register", registerUser); 
router.post("/login", login); 

export default router;
