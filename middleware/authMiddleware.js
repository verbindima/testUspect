import jwt from 'jsonwebtoken';

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        //const {accessToken} = req.cookies
        const accessToken = req.headers.authorization.split(' ')[1]
        if (!accessToken) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const decodedData= jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
}
