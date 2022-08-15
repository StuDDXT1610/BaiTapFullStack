const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
// 1. Kiểm tra xem token có hợp lệ hay không
// Có gửi token lên hay không


// 1. Kiểm tra xem token có hợp lệ hay không
// Có gửi token lên hay không
const protect = asyncHandler(async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer')) {
        // Check tiếp xem token có thực sự hợp lệ hay không
        try {
            // Bearer abcdddf.xdffdt.xfcdfd -> ['Bearer', 'abcdddf.xdffdt.xfcdfd'];
            const token = req.headers.authorization.split(' ')[1];
            const userVerify = jwt.verify(token, 'khong gion dau');
            console.log('userVerify', userVerify);
            const userInfo = await User.findById(userVerify.id).select('-password');
            console.log('userInfo', userInfo);
            req.user = userInfo;
            // req.user = await User.findById(userVerify.id).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('token invalid');
        }
    } else {
        res.status(401);
        throw new Error('Not authorization or no token or token invalid');
    }
});

const checkIsAdmin = asyncHandler(async (req, res, next) => {
    const user = req.user
    if( user && user.isAdmin){
        next()
    } else {
        res.status(401);
            throw new Error('u are no admin');
    }
})
module.exports ={
    protect,
    checkIsAdmin,
}