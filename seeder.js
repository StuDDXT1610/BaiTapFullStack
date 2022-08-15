const Product = require('./models/productModels')
const User = require('./models/userModel')
const products = require('./data/product');
const connnectDB = require('./config/db')
connnectDB()
const importData = async () => {
    
    try {
        //await Product.deleteMany()
    // Xử lý logic import dữ liệu vào trong database
    const userAdmin = await User.findOne({ email: 'xuantung1610@gmail.com'})
    const sampleProducts = products.map((product) => {
        return { ...product, user: userAdmin._id}
    })
    await Product.insertMany(sampleProducts)
    console.log('Data imported success !!!');
    } catch (e){
        console.log(e);
        console.log('Data imported failed !!!');
    }
}

importData()