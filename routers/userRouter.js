import Router from 'express';
import { check } from 'express-validator';
import controllers from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { register, login , logout, updateUser, getUser } = controllers;

const router = new Router;

router.post('/register', [
    check('login', "Логин не может быть пустым").notEmpty() //[POST] /user/register
], register)
router.post('/login', login);                               //POST] /user/login
router.post('/logout', logout);                             //[POST] /user/logout
router.patch('/', authMiddleware(), updateUser);                               //[POST/PATCH] /user/
router.get('/', authMiddleware(), getUser);        //[GET] /user/

export default router 