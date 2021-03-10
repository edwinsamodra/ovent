const db = require("../models");
const Product = db.products;
const Vendor = db.vendors;
const { Sequelize, ABSTRACT } = require('sequelize');
const Op = Sequelize.Op

function showPopularProducts(req, res, next) {
    Product.findAll({
        where: {
            rating: {
                [Op.gt]: 7
            }
        }
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            message: "The data was successfully obtained",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: err,
            data: null
        })
    })
}

function showCatheringProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'cathering'
        }
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            message: "The data was successfully obtained",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: err,
            data: null
        })
    })
}

function showDecorationProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'decoration'
        }
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            message: "The data was successfully obtained",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: err,
            data: null
        })
    })
}

function showRentProducts(req, res, next) {
    Product.findAll({
        where: {
            category: 'rent'
        }
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            message: "The data was successfully obtained",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: err,
            data: null
        })
    })
}

async function showById(req, res, next) {
    const id = req.params.id
    try {
        const product = await Product.findOne({
            where: {
                id: id
            },
            include: [ {
                model: Vendor,
                attributes: ['name', 'address', 'description', ]
                }
            ]
        })
        let category = product.category
        let relatedProduct = await Product.findAll({
            limit: 4,
            where: {
                [Op.and]: [{ category: category }, { id: { [Op.not]: id } }]
            }
        })
    
        let data = {
            product,
            relatedProduct
        }
        res.json({
            status: 'success',
            message: "The data was successfully obtained",
            data: data
            })
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err,
            data: null
        })
    }
}

function search(req, res, next) {
    const address = req.body.address;
    const name = req.body.name;
    Product.findAll({
        where: {
            [Op.or]: {
                'name': {
                    [Op.like]: `%${name}%`,
                },
                '$Vendor.address$': {
                    [Op.like]: `%${address}%`
                }
            }
            
        },
        include: [ {
            model: Vendor,
            attributes: ['name', 'address']
            }
        ]
    })
    .then((data) => {
        res.status(200).json({
            status: "success",
            message: "The data was successfully obtained",
            data: data
        })
    })
    .catch((err) => {
        res.status(500).json({
            status: "error",
            message: err,
            data: null
        })
    })
}

module.exports = {
    showPopularProducts,
    showCatheringProducts, 
    showDecorationProducts, 
    showRentProducts,
    showById,
    search
}