import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import tokenService from '../services/tokenService.js'
class UserService {
  async register(login, password, phone, sex, isAdmin) {
    const candidate = await User.findOne({ login })
    if (candidate) {
      throw new Error('Пользователь с таким именем уже существует')
    }
    const hashPassword = bcrypt.hashSync(password, 7) //Hash password
    const user = new User({
      login,
      password: hashPassword,
      phone,
      sex,
      isAdmin,
    })
    const tokens = tokenService.generateTokens(user._id, user.isAdmin)
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return { ...tokens, user }
  }

  async login(login, password) {
    const user = await User.findOne({ login })
    if (!user) {
      throw new Error(`Пользователя ${login} не сушествует`)
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      throw new Error('Введен неправильный пароль')
    }
    const tokens = tokenService.generateTokens(user._id, user.isAdmin)
    await tokenService.saveToken(user._id, tokens.refreshToken)
    return { ...tokens, user }
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }
  async updateUser(refreshToken, userChanges) {
    const token = await tokenService.findToken(refreshToken)
    if (!token.user) {
      throw new Error('Неправильный токен')
    }
    const userUpdated = await User.findByIdAndUpdate(token.user, userChanges, {
      new: true,
    })
    return userUpdated
  }
  async getUser(refreshToken) {
    const decodedData = tokenService.validateRefreshToken(refreshToken)
    const { id } = decodedData
    const user = await User.findById(id)
    return user
  }
}
export default new UserService()
