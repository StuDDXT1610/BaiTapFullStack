const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: {
        required: true,
        type: String,
    },
    product_price: {
        required: true,
        type: Number,
    },
    product_amount: {
        required: true,
        type: Number,
    },

})
module.exports = mongoose.model('Product', productSchema);