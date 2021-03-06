import * as dotenv from 'dotenv'
dotenv.config({ path: './.env' })
import express, { json } from 'express'
import mongoose from 'mongoose'
import userRouter from '../../routers/userRouter.js'
import goodsRouter from '../../routers/goodsRouter.js'
import adminRouter from '../../routers/adminRouter.js'
import cookieParser from 'cookie-parser'
const PORT = process.env.PORT || 5000
const app = express()

app.use(json())
app.use(cookieParser())
app.use('/api/v1/user', userRouter)
app.use('/api/v1/goods', goodsRouter)
app.use('/api/v1/admin-data', adminRouter)

async function start() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start()
