const { QueryTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/config')
const db = require("../models");
const User = db.User;


const registerUser = (req, res) => {
    const { email, pass, name } = req.body
    User.findOne({ where: { email: email }})
        .then(data => {
            if (data) {
                throw 'Email sudah digunakan'
            }
            return User.create({ email, pass, name})
        })
        .then((data) => {
            let token = createToken(data)
            token = 'Bearer ' + token
            res.status(201).json({
                status: "success",
                message: "user registered successfully",
                data: {
                    access_token: token
                }
            })
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: 'error',
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
                throw 'record not found'
            }
            return user.dataValues
        })
        .then(user => {
            const isValidPass = bcrypt.compareSync(pass, user.pass)
            if (!isValidPass) {
                throw 'crypto/bcrypt: hashedPassword is not the hash of the given password'
            }
            
            let token = createToken(user)
            token = 'Bearer ' + token
            res.json({
                status: "success",
                message: "login successfully",
                data: {
                    access_token: token
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                status: 'error',
                message: err,
                data: null
            })
        })
}

const createToken = (user) => {
    const payload = {
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
    }
    return jwt.sign(payload, JWTSECRET, { expiresIn: '1d' })
}

module.exports = {registerUser, loginUser}