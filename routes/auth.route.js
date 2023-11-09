import express from "express";
import { register, userLogin, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout", logout);

export default router;
