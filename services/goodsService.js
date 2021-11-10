import Goods from '../models/Goods.js'

class GoodsService {
  async createGoods(product) {
    const createdProduct = await Goods.create({ ...product })
    return createdProduct
  }
  async getGoodsAll(start, limit) {
    const goods = await Goods.find()
      .limit(limit)
      .skip(start - 1)
    return goods
  }
  async getOne(id) {
    if (!id) {
      throw new Error('Не указан ID')
    }
    const product = await Goods.findById(id)
    return product
  }
  async deleteOne(id) {
    if (!id) {
      throw new Error('Не указан ID')
    }
    const product = await Goods.findByIdAndDelete(id)
    return product
  }
}

export default new GoodsService()
