import express, { json } from 'express';
import mongoose from 'mongoose';
import userRouter from "../../routers/userRouter.js";

const PORT =  5050;


const app = express();

app.use(json())
app.use("/api/v1/user", userRouter)

async function start()  {
    try {
        await mongoose.connect('mongodb+srv://user:user@backend-starter.g7qtq.mongodb.net/USPECT?retryWrites=true&w=majority')
         app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}
start();