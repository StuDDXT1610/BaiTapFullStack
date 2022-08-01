const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = res.header('auth-token')
    if (!token) res.status(401).send('Could not acces to system')

    try{
        const checkToken = jwt.verify(token, 'khong the can pha')
        req.user = checkToken
        next()
    } catch(err){
        res.status(400).send("Token incorrect!");
    }
}