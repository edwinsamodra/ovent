const express = require('express')
const userController = require('../controllers/user.controller')
const { registerValidator } = require('../middleware/registerValidator')
const db = require('../models')

const router = express.Router()

router.post('/register', registerValidator, userController.registerUser);

router.post('/login', userController.loginUser)

router.get('/coba', (req, res) => {
    db.sequelize
        .authenticate()
        .then(() => {
            res.send('Koneksi Berhasil')
          console.log('Connection has been established successfully.');
        })
        .catch(err => {
            res.status(500).json({
                status: "error",
                message: err,
                data: null
            })
          console.error('Unable to connect to the database:', err);
        });
      
})

module.exports = router