import { validationResult } from 'express-validator';
import userService from '../services/userService.js';

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
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json({message: 'logout'})

        } catch(e) {
            res.status(400).json({message: 'logout Error'})
        }
    }
    async updateUser(req, res) {
        try {
            const {refreshToken} = req.cookies;
            await userService.updateUser(refreshToken, req.body)
            res.status(200).json({ message: 'Данные обновлены'})
        } catch(e) {
            res.status(400).json({message: 'updateUser Error'})
        }
    }
    
    async getUser(req, res) {
        try {
            const {refreshToken} = req.cookies;
            //const token = req.headers.authorization.split(' ')[1]
        const user = await userService.getUser(refreshToken)
        
        res.status(200).json({user});
            
        } catch (e) {
             console.log(e);
             res.status(400).json({message: 'User Error'})
        }
    }
}
export default new userController();