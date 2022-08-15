const mongoose = require('mongoose')
const { Schema } = mongoose
const reviewSchema = mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    rating: { 
        type: Number, 
        require: true,
        default : 10,
        min : 1,
        max : 10
    },
    comment: { 
        type: String, required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    }
})

const Review = mongoose.model('Reviews', reviewSchema)
module.exports = Review
