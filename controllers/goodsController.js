import { validationResult } from 'express-validator';
import goodsService from '../services/goodsService.js';


class goodsController {
    async createGoods(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const product  = await goodsService.createGoods(req.body)
            res.status(200).json({ message: 'Товар добавлен'})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'createGoods Error'})
        }
    }
    async getGoodsAll(req, res) {
        try { 
            const start = parseInt(req.query.start)
            const limit = parseInt(req.query.limit);
            const goods = await goodsService.getGoodsAll(start, limit)
            
            res.status(200).json({goods})
        } catch(e) {
            console.log(e)
            res.status(400).json({message: 'postGoods Error'})
        }
    }
    async getGoodsById(req, res) {
        try {
            const product = await goodsService.getOne(req.params.id); 
            res.status(200).json({product})
        } catch(e) {
            res.status(400).json({message: 'postGoods Error'})
        }
    }
    async deleteGoodsById(req, res) {
        try {
            const product = await goodsService.deleteOne(req.params.id);
            res.status(200).json(product)
        } catch(e) {
            res.status(400).json({message: 'postGoods Error'})
        }
    }
}
export default new goodsController();

