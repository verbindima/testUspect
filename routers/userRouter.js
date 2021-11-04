import Router from 'express';
import { check } from 'express-validator';
const router = new Router;
import { register, login, logout, updateUser, getUser } from './userController.js';
import roleMiddleware from "./middleware/roleMiddleware.js";


router.post('/register', [
    check('login', "Логин не может быть пустым").notEmpty() //[POST] /user/register
], register)
router.post('/login', login);                               //POST] /user/login
router.post('/logout', logout);                             //[POST] /user/logout
router.post('/', updateUser);                               //[POST/PATCH] /user/

router.get('/', roleMiddleware(['USER']), getUser);        //[GET] /user/


export default router 