const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/config')
const db = require("../models");
const User = db.users;


const registerUser = (req, res) => {
    const { email, pass } = req.body
    User.findOne({ where: { email: email }})
        .then(data => {
            if (data) {
                throw 'Email is already in use!'
            }
            let name = email.split("@");
            name = name[0]
            return User.create({ name, email, pass })
        })
        .then((data) => {
            let token = createToken(data)
            token = 'Bearer ' + token
            res.status(201).json({
                status: "success",
                message: "User registered successfully",
                data: {
                    access_token: token
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: "error",
                message: err,
                data: null
            })
        });
}

const loginUser = (req, res) => {
    const { email, pass } = req.body
    
    User.findOne({ where: { email: email }})
        .then(user => {
            if(!user) {
                throw 'Incorrect email or password!'
            }
            return user.dataValues
        })
        .then(user => {
            const isValidPass = bcrypt.compareSync(pass, user.pass)
            if (!isValidPass) {
                throw 'Incorrect email or password!'
            }
            
            let token = createToken(user)
            token = 'Bearer ' + token
            res.json({
                status: "success",
                message: "Login successfully",
                data: {
                    access_token: token
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: err,
                data: null
            })
        })
}

const createToken = (user) => {
    const name = user.email.split("@");
    const payload = {
        userId: user.id,
        name: name[0],
        email: user.email,
        city: user.city,
        avatar: user.avatar,
    }
    return jwt.sign(payload, JWTSECRET, { expiresIn: '1d' })
}

module.exports = {registerUser, loginUser}