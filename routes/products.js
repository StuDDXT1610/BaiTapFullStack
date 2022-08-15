var express = require('express');
const { getAllProducts, 
        getProductsById,
        deleteProductById,
        createProduct,
        updateProductById,
        getTopProduct,
        postReview, 
        } = require('../controller/productController');
const { 
    protect,
 checkIsAdmin 
} = require('../middleware/authMiddleware');
var router = express.Router();

//1.Get all products
// @desc: Get all products
// @route: GET /api/products
// @access: Public

router.get('/', getAllProducts)

//2.Get product by ID
// @desc: Get product by ID
// @route: GET /api/products/:id
// @access: Public

router.get('/:id', getProductsById)

//3. Delete product by ID
// @desc: Delete product by ID
// @route: DELETE /api/products/:id
// @access: Private/admin

router.delete('/:id', protect, checkIsAdmin, deleteProductById )

//4. Create product
// @desc: Create product
// @route: POST /api/products
// @access: Private/admin
router.post('/', protect, checkIsAdmin, createProduct)

//5.Update a product
// @desc: Update a product
// @route: PUT /api/products/:id
// @access: Private/admin
router.put('/:id', protect, checkIsAdmin, updateProductById)

// 6. Create new review for product
// @desc: Create new review for product
// @route: POST /api/products/:id/reviews
// @access: Private
//Lưu thông tin người review vào cột review
//Đếm số lượng người review và lưu vào cột numReviews
//Tính tổng review trung bình (Lưu vào cột rating)
//Gợi ý:
//Đếm số lượng: MaxLength của cột Review
//Tính tổng review trung bình: dùng hàm reduce trong javascript
router.post('/:id/reviews', protect, postReview)

//7.Get top 5 products (top 5 sản phẩm được rating trung bình cao nhất)
// @desc: Get top 5 products
// @route: GET /api/products/top
// @access: Public
router.get('/top', getTopProduct)

module.exports = router;