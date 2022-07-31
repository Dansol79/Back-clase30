const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_KEY = process.env.PRIVATE_KEY;

module.exports = function authenticateToken(req, res, next){

    const authHeader = req.headers.authorization
    console.log(authHeader);

    if(!authHeader){
        return res.status(401).json({
            error: 'No autenticado'
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_KEY, (err, decoded) => {

        if(err){
            return res.status(403).json({
                error: 'No autorisado'
            });
        }
        req.user = decoded.data;
        next();
    })
}