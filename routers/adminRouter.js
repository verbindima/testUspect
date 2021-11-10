import Router from 'express';
import controllers from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { getAdminData } = controllers;

const router = new Router;

router.get('/', authMiddleware(true), getAdminData); 

export default router