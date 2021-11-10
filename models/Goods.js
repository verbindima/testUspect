import mongoose from 'mongoose'
const { Schema, model } = mongoose

const Goods = new Schema({
  productName: { type: String, unique: true, required: true },
  productType: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productDescription: { type: String },
})

export default model('Goods', Goods)
