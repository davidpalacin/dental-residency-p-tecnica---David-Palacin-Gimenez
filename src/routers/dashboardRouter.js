import express from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

// /login
dashboardRouter.get('/', dashboardController.enterDashboard);

export default dashboardRouter;