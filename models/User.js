import mongoose from 'mongoose'
const { Schema, model } = mongoose

const User = new Schema({
  login: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  sex: { type: String },
  isAdmin: { type: Boolean, default: false },
})

export default model('User', User)
