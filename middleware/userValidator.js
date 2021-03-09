const jwt = require('jsonwebtoken'),
secretKey = process.env.JWTSECRET || '270400';
exports.validateUser = (req, res, next) => {
    console.log(req)
    let token = req.headers['authorization'];

    if(!token) return res.status(401).json({status:401, message: "Unauthorized"});
    
    token = token.replace('Bearer ', '');
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            response.error(res, "Invalid token");
        } else {
            req.body.user_id = decoded.id;
            req.body.username = decoded.username;
            next();
        }
    });
}