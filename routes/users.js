var express = require('express');
var router = express.Router();
const { 
        protect,
     checkIsAdmin 
    } = require('../middleware/authMiddleware');
const {
    registerUser, 
    authLogin, 
    getUserProfile, 
    updateUserProfile,
    getAllUsers,
    deleteUserById,
    getAllUserById,
    updateUserById
       } = require('../controller/userController') // dùng {} để export ra nhiều object, còn nếu là export default thì k cần dùng ngoặc {}
// 1.
// @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token

router.post('/', registerUser)

// 2.
// @desc: User can login to system
// @route: POST /api/users/login
// @access: Public - return token
router.post('/login',authLogin)

// 3.
// @desc: Get user profile
// @route: GET /api/users/profile
// @access: Private - Su dung token
router.get('/profile', protect, getUserProfile)

// 4.
// @desc: update user profile
// @route: PUT /api/users/profile
// @access: Private- Su dung token
router.put('/profile', protect, updateUserProfile);

// 5. Get all users
// @desc: Get all users
// @route: GET /api/users
// @access: Private/admin
router.get('/', protect, checkIsAdmin, getAllUsers);


// 6.
// @desc: Delete user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete('/:id', protect, checkIsAdmin, deleteUserById)

// 7. Get user by ID
// @desc: Get user by ID
// @route: GET /api/users/:id
// @access: Private/admin
router.get('/:id', protect, checkIsAdmin, getAllUserById)

//8. Update user by ID
// @desc: Update user by ID
// @route: PUT /api/users/:id
// @access: Private/admin
router.put(':id', protect, checkIsAdmin, updateUserById)

module.exports = router
