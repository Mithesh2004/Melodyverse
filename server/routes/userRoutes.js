import express from "express";
import {
  signupUser,
  signinUser,
  signoutUser,
  forgotPassword,
  resetPassword,
  checkLoggedIn,
} from "../controllers/userController.js";
import protectRoute from "../middlewares/protectRoute.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.post("/signout", signoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/check-auth", verifyToken, checkLoggedIn);

export default router;
