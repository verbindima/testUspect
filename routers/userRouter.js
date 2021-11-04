import Router from 'express';
import { check } from 'express-validator';
import controllers from '../controllers/userController.js';
const { register, login , logout, updateUser, getUser } = controllers;

const router = new Router;


router.post('/register', [
    check('login', "Логин не может быть пустым").notEmpty() //[POST] /user/register
], register)
router.post('/login', login);                               //POST] /user/login
router.post('/logout', logout);                             //[POST] /user/logout
router.post('/', updateUser);                               //[POST/PATCH] /user/

router.get('/',  getUser);        //[GET] /user/


export default router 