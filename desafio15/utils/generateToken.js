const jwt = require('jsonwebtoken');

module.exports = function generateToken(user) {
    const token = jwt.sign({data: user }, process.env.PRIVATE_KEY,{expiresIn: '1d'})
    return token;
}
