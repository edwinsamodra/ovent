const db = require("../models");
const Product = db.products;
const Vendor = db.vendors;
const { Sequelize } = require('sequelize');
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

function showById(req, res, next) {
    const id = req.params.id;
    Product.findOne({
        where: {
            id: id
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

function search(req, res, next) {
    // const ven = Vendor.findAll({})
    // console.log(req.body);
    const city = req.body.city;
    const name = req.body.name;
    Product.findAll({
        where: {
            [Op.or]: {
                name: {
                    [Op.like]: `%${name}%`,
                },
                city: { // nama kolom city seharusnya ambil dari table vendor yg punya produk tersebut bukan dari table product
                    [Op.like]: `%${city}%`,
                }
            },
            
        }
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        return next(err)
    })
}

//     .then((data) => {
//         res.status(200).json({
//             product
//         });
//     }).catch((err) => {
//         return next(err)
//     });
// }

module.exports = {
    showPopularProducts, 
    showCatheringProducts, 
    showDecorationProducts, 
    showRentProducts,
    showRelatedProducts,
    showById,
    search
}