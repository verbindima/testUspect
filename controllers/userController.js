import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from "../models/User.js";


class userController {

    async register(req,res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(401).json({message: "Ошибка валидации при регистрации", errors})
            }
            const {login, password, phone, sex, isAdmin} = req.body
            const candidate = await User.findOne({login})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7); //Hash password
            const user = new User({login, password: hashPassword, phone, sex, isAdmin})
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"});
        } catch (e) {
            console.log(e)
            res.status(401).json({message: 'registration Error'}) 
        }
    }
    
    async login(req,res) {
        try {
            const {login, password} = req.body
            return res.status(400).json({message: 'login Error'})
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
            res.status(400).json({message: 'logout Error'})
        }
    }
    
    async getUser(req,res) {
        try {
            
            
        } catch (e) {
             
             res.status(400).json({message: 'User Error'})
        }
    }
}
export default new userController();