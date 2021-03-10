const jwt = require('jsonwebtoken'),
secretKey = process.env.JWTSECRET || '123123';
exports.validateUser = (req, res, next) => {
    let token = req.headers['auth'];

    if(!token) return res.status(401).json({status:401, message: "Unauthorized"});
    
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(400).json({
                status: "error",
                message: err,
                data: null
            })
        } else {
            req.body.id = decoded.userId;
            req.body.name = decoded.name;
            req.body.email = decoded.email;
            req.body.city = decoded.city;
            req.body.avatar = decoded.avatar;
            next();
        }
    });
}