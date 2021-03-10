const express = require('express')
const productController = require('../controllers/product.controller')
// const { validateUser } = require('../middleware/userValidator'
// user validate digunakan saat anonym klik tambah ke cart

const router = express.Router()

// without authentication
router.get('/popularProducts', productController.showPopularProducts)

router.get('/catheringProducts', productController.showCatheringProducts)

router.get('/decorationProducts', productController.showDecorationProducts)

router.get('/rentProducts', productController.showRentProducts)

router.post('/search', productController.search)

router.get('/:id', productController.showById)


module.exports = router