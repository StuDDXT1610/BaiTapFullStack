const asyncHandler = require('express-async-handler');
const Product = require('../models/productModels');
const Review = require('../models/reviewModels')

// http://localhost:3000/api/products?keyword=sac-iphone&pageNumber=2
const getAllProducts = asyncHandler(async(req,res) => {
    // Fix số lượng sản phẩm hiển thị trên 1 trang
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keywords = req.query.keywords ? {name : { $regex: req.query.keywords } }  : {} // định nghĩa 1 keyword trên req truyền obj vào await
    const countProduct = await Product.countDocuments({ ...keywords})
    // giả sử có 20 sản phẩm, đang ở trang số 2, skip qua 10 sản phẩm đầu, chỉ lấy từ sản phẩm số 11 trở đi
    const products = await Product.find({...keywords}).limit(pageSize).skip(pageSize * (page - 1))
    
    res.json(products,
        countProduct,
        page
        )
})

const getProductsById = asyncHandler(async(req,res) => {
    const products = await Product.findById(req.params.id).populate('reviews')

    if (products){
        res.json(products)
    }
    else{
        res.status(400)
            res.json({
                message: " no product"
        })
    }
})

const deleteProductById = asyncHandler(async(req,res) => {
    const products = await Product.findById(req.params.id)
    if (products) {
        products.remove()
        res.json({message: 'delete succesful'})
    } else {
    res.status(400);
    throw new Error('Product not found');
    }
})

const createProduct = asyncHandler(async(req,res) => {
    const {user, name, image, brand, category, description, reviews, rating, numReviews, price, countInStock} = req.body
    const productsExists = await Product.findOne({ name })
    if (productsExists) {
        res.status(400)
        throw new Error('User already exists');
    }
    const newProducts = await Product.create({user, name, image, brand, category, description, reviews, rating, numReviews, price, countInStock})
    if (newProducts){
        const newProductsInfo = await newProducts.populate('user')
        res.json(
            newProductsInfo
            //{
            //_id: newProducts._id,
           // user: newProducts.user,
           // name: newProducts.name,
           // image: newProducts.image,
           // brand: newProducts.brand,
           // category: newProducts.category,
          //  description: newProducts.description,
           /// reviews: newProducts.reviews,
           // rating: newProducts.rating,
           // numReviews: newProducts.numReviews,
           // price: newProducts.price,
           // countInStock: newProducts.countInStock
            //}
           
        )       
    } else {
        res.status(400)
        throw new Error('product already exists');
    }
})

const updateProductById = asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = req.body.name || product.name
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.description = req.body.description || product.description
        product.reviews = req.body.reviews || product.reviews
        product.rating = req.body.rating || product.rating
        product.numReviews = req.body.numReviews || product.numReviews
        product.price = req.body.price || product.price
        product.countInStock = req.body.countInStock || product.countInStock

        const updateProduct = await product.save()
        res.json({
            _id: updateProduct._id,
            name: updateProduct.name,
            image: updateProduct.image,
            brand: updateProduct.brand,
            category: updateProduct.category,
            description: updateProduct.description,
            reviews: updateProduct.reviews,
            rating: updateProduct.rating,
            numReviews: updateProduct.numReviews,
            price: updateProduct.price,   
            countInStock: updateProduct.countInStock,
        })
    } else {
        res.status(400)
        throw new Error('Error update');
    }
})

const postReview = asyncHandler(async(req, res) => {
    try {
        const findProduct = await Product.findById(req.params.id)
        if (findProduct){
        const newReview = await (await Review.create(req.body)).populate('user')
        newReview.user = req.user._id
        newReview.product = findProduct._id
        findProduct.reviews.push(newReview)
        const updateReview = await findProduct.save()
        const setNumReviews = updateReview.reviews.length 
        findProduct.numReviews = setNumReviews
        const avrRating = findProduct.reviews.reduce((total, value) => {
            return total + value.rating;
          }, 0) 
        ;
    
        findProduct.rating = Math.floor(avrRating / setNumReviews)
        const updateProduct = await findProduct.save()
        res.json(updateProduct)
        } else {
            res.status(400)
            throw new Error('Error')
        }
    } catch (err) {
        res.status(400)
        throw new Error(err)
    }
    });
    

const getTopProduct = asyncHandler(async(req,res) => {
    try {
    const topProduct = await Product.find().select('rating').sort({rating : desc}).limit(5)
    res.json(topProduct)
} catch (err) {
        res.status(400);
        throw new Error(error);
    }

})


module.exports = {
    getAllProducts,
    getProductsById,
    deleteProductById,
    createProduct,
    updateProductById,
    getTopProduct,
    postReview
}