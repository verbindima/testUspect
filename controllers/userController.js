import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs'
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { secret } from "../config.js" 
import userService from '../services/userService.js';

const validateAccessToken = token => {
    try {
        const userData = jwt.verify(token, secret);
        return userData;
    } catch (e) {
        return null;
    }
}

class userController {

    async register(req,res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Ошибка валидации при регистрации", errors})
            }
            const {login, password, phone, sex, isAdmin} = req.body
            const userData = await userService.register(login, password, phone, sex, isAdmin)
            await userData.user.save()
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({userData, message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e)
            res.status(401).json({message: 'registration Error'}) 
        }
    }
    
    async login(req,res) {
        try {
            const {login, password} = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({accessToken: userData.accessToken, refreshToken: userData.refreshToken});
        } catch (e) {
           res.status(400).json({message: 'login Error'})
        }
    }
    async logout(req,res) {
        try {



        } catch(e) {
            res.status(400).json({message: 'logout Error'})
        }
    }
    async updateUser(req,res) {
        try {



        } catch(e) {
            res.status(400).json({message: 'updateUser Error'})
        }
    }
    
    async getUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData= validateAccessToken(token)
        const {id} = decodedData
        const user = await User.findById(id)
        res.json({user});
            
        } catch (e) {
             console.log(e);
             res.status(400).json({message: 'User Error'})
        }
    }
}
export default new userController();