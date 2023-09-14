import express from 'express';
import { authController } from "../controllers/authController.js"

const authRouter = express.Router();

// URL base: /auth
authRouter.get('/login', authController.loginGet); // Devoler formulario HTML
authRouter.post('/login', authController.loginPost); // Iniciar sesión por POST
authRouter.get('/logout', authController.logout); // Cerrar sesión

export default authRouter;