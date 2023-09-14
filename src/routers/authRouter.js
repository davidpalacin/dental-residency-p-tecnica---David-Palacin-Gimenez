import express from 'express';
import { authController } from "../controllers/authController.js"

const authRouter = express.Router();

// /login
authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);
authRouter.get('/logout', authController.logout);

export default authRouter;