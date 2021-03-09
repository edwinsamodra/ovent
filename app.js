const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const CORS = require('cors')

app.use(CORS())

// Router
const userRoute = require('./routes/user.routes')
const productRoute = require('./routes/product.routes')

// db.sequelize.sync({ });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false}))

// defining user, product route
app.use('/', userRoute)
app.use('/product', productRoute)

app.get('/', (req, res) => {
    res.json({
        message: "Welcome!"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, (res) => {
    console.log(`Our app running on http://localhost:${PORT}`)
})