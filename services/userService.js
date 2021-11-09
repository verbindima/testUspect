import bcrypt from 'bcryptjs'
import User from "../models/User.js";
import tokenService from "../services/tokenService.js"
class UserService {
    async register(login, password, phone, sex, isAdmin) {
            const candidate = await User.findOne({login})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7); //Hash password
            const user = new User({login, password: hashPassword, phone, sex, isAdmin})
            const tokens = tokenService.generateTokens(user._id, user.isAdmin)
            await tokenService.saveToken(user._id, tokens.refreshToken)
            
            return {...tokens, user}
    }
    
    async login(login, password) {
        const user = await User.findOne({login})
        if (!user) {    
            return res.status(400).json({message: `Пользователя ${login} не сушествует`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({message:"Введен неправильный пароль"})
        }
        const tokens = tokenService.generateTokens(user._id, user.isAdmin)
        await tokenService.saveToken(user._id, tokens.refreshToken)
        return {...tokens, user}
    }
    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async updateUser(refreshToken, userChanges) {
        const token = await tokenService.findToken(refreshToken)
        if (!token.user) {    
            return res.status(400).json({message: `Ошибка токена`})
        }
        const userUpdated = await User.findByIdAndUpdate(token.user, userChanges, {new: true})
        return userUpdated;
    }
}
export default new UserService();