import express from "express";
import { checkLoggedIn } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkLoggedIn);

export default router;
