const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// Router
const userRoute = require('./routes/user.route')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false}))

// defining user route
app.use('/', userRoute)

app.get('/', (req, res) => {
    res.json({
        message: "Welcome!"
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, (res) => {
    console.log(`Our app running on http://localhost:${PORT}`)
})