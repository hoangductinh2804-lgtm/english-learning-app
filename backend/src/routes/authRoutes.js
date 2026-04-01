import { Router } from "express";
import { login, logActivity, register, updateProfile } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/profile", requireAuth, updateProfile);
router.post("/activity", requireAuth, logActivity);

export default router;
