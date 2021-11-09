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
            const goods = await goodsService.getGoodsAll()
            
            res.status(200).json({goods})
        } catch(e) {
            res.status(400).json({message: 'postGoods Error'})
        }
    }
    async getGoodsById(req, res) {
        try {
            
            res.status(200).json({ message: 'Данные обновлены'})
        } catch(e) {
            res.status(400).json({message: 'postGoods Error'})
        }
    }
    async deleteGoodsById(req, res) {
        try {
            
            res.status(200).json({ message: 'Данные обновлены'})
        } catch(e) {
            res.status(400).json({message: 'postGoods Error'})
        }
    }
}
export default new goodsController();

