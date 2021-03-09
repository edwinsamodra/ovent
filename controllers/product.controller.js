const db = require("../models");
const Product = db.products;
const Op = Sequelize.Op

function showPopularProducts(req, res, next) {
    Product.findAll({
        where: {
            rating: {
                [Op.gt]: 7
            }
            // Jika memang butuh, maka buat dua, buat fetch all data
            // sama ngefecth tapi dibatasi cuma nampil beberapa aja
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

function showCatheringProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'cathering'
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

function showDecorationProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'decoration'
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

function showRentProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'rent'
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

function showRelatedProducts(req, res, next) {
    Product.findAll({
        // where: {
            // category: req.category
        // }
        // perlu di selidiki dulu soalnya kalo ini tu
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

module.exports = {
    showPopularProducts, 
    showCatheringProducts, 
    showDecorationProducts, 
    showRentProducts,
    showRelatedProducts
}