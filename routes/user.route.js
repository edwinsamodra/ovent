const express = require('express')
const userController = require('../controllers/user.controller')
const { registerValidator } = require('../middleware/registerValidator')

const router = express.Router()

// register user
router.post('/register', registerValidator, userController.registerUser);

// login
router.post('/login', userController.loginUser)

router.get('/coba', (req, res) => {
    res.send("Hi")
})

// update
// router.put('/:id', userController.update)

module.exports = router