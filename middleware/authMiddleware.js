import jwt from 'jsonwebtoken'

export default function (onlyAdmin = false) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      //const {accessToken} = req.cookies
      const accessToken = req.headers.authorization.split(' ')[1]
      if (!accessToken) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }
      const decodedData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
      const { isAdmin } = decodedData
      if (onlyAdmin) {
        if (!isAdmin) {
          return res.status(403).json({ message: 'В доступе отказано' })
        }
      }
      next()
    } catch (e) {
      console.log(e)
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
  }
}
