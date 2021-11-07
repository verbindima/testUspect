import tokenModel from "../models/Token.js"
import jwt from 'jsonwebtoken';

class TokenService {
    generateTokens(id, isAdmin) {
        const payload = {
            id,
            isAdmin
       }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30s'})
        return {
            accessToken,
            refreshToken
        }
    }
    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }   
}
export default new TokenService();