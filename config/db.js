const mongoose = require('mongoose')

const connectDB = async () => {
    // thuc hien connect database

    try {
        const dbConfig = 'mongodb://localhost/fullstack-ecommerce'
        const connect = await mongoose.connect(dbConfig)
        console.log(`Mongo connected: ${connect.connection.host}`)
    } catch (e){
        console.log('Error connect to mongodb')
    }
}

module.exports = connectDB