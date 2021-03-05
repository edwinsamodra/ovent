const express = require('express')
const userController = require('../controllers/user.controller')
const { registerValidator } = require('../middleware/registerValidator')
const db = require('../models')

const router = express.Router()

// register user
router.post('/register', registerValidator, userController.registerUser);

// login
router.post('/login', userController.loginUser)

router.get('/coba', (req, res) => {
    db.sequelize
        .authenticate()
        .then(() => {
            res.send('Koneksi Berhasil')
          console.log('Connection has been established successfully.');
        })
        .catch(err => {
            res.json({
                status: 'error',
                message: err
            })
          console.error('Unable to connect to the database:', err);
        });
      
})

// update
// router.put('/:id', userController.update)

module.exports = router