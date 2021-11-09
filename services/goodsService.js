import Goods from "../models/Goods.js";

class GoodsService {
    async createGoods(product) {
        const createdProduct = await Goods.create({...product})
        return createdProduct;
    }
    async getGoodsAll() {
        return await Goods.find()
    }
}

export default new GoodsService()