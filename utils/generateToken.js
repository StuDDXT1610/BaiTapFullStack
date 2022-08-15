const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id}, 'khong gion dau', {expiresIn: '1d'})
    
}

module.exports = generateToken;