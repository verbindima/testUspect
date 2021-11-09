import Router from 'express';
import { body } from 'express-validator';
import controllers from '../controllers/goodsController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const { createGoods, getGoodsAll, getGoodsById, deleteGoodsById } = controllers;

const router = new Router;

router.post('/', [
    body('productName', "Имя товара не может быть короче 3 символов").isLength({min: 3}),
body( 'productType', 'В типе должно быть минимум три символа').isLength({min: 3}),
body('productPrice', 'Неправильный формат цены')
.custom(val => {
    if (val >= 0) {
        return true
    }
    return false
})
.isNumeric()
], createGoods)                                 //POST] /goods
router.get('/', getGoodsAll);                               //GET] /goods
router.get('/{id}', getGoodsById);                             //[GET] /goods/{id}
router.delete('/{id}', authMiddleware, deleteGoodsById);      //[DELETE] /goods/{id}



export default router 