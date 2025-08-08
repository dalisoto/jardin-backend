import { Router } from "express";
import { register, login, getUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", getUser);

export default router;
