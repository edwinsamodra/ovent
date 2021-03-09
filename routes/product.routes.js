const express = require('express')
const productController = require('../controllers/product.controller')
const { validateUser } = require('../middleware/userValidator')

const router = express.Router()

router.get('/popularProducts', validateUser, productController.showPopularProducts)

router.get('/catheringProducts', productController.showCatheringProducts)

router.get('/decorationProducts', productController.showDecorationProducts)

router.get('/rentProducts', productController.showRentProducts)

module.exports = router