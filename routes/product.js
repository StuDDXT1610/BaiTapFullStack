const express = require('express');
const router = express.Router();
const productModels = require('../models/product.models')
const verifyUserMiddleware = require('../middleware/authMiddleware');
router.get('/category', async (req, res) => {
    const productName = req.query.product_name;
    productName = productModels.findOne({ name: productName}).exec((err, pro) =>{
        if (err) {
            res.send('loi roi');
          } else {
            console.log('lấy thành công thông tin user' )
            res.json(pro)
          }
    })
})

router.post('/category', verifyUserMiddleware, async (req, res) => {
    const newProduct = new productModels()
    newProduct.product_name = req.body.product_name
    newProduct.product_price = req.body.product_price
    newProduct.product_amount = req.body.product_amount

    try {
        const products = await newProduct.save()
        res.send(products)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/:id', verifyUserMiddleware, async (req, res) => {
    productModels.findByIdAndUpdate(
      {_id:  req.params.id},
      { $set: { product_name: req.body.product_name, 
                product_price: req.body.product_price, 
                product_amount: req.body.product_amount,                  
              }},
      {
        upsert: false,
      },
      (err, pros) => {
        if (err) {
          console.log(err)
          res.send('co loi xay ra khi update')
        }else{
          res.json(pros)
        }
      }
      )
  })

router.delete('/:id', verifyUserMiddleware, async (req, res) => {
   productModels.findByIdAndDelete(
    {_id: req.params.id},
    function(err, user) {
        if (err) {
          console.log(err);
          res.send('co loi xay ra khi delete')
        } else {
          console.log('xoa thanh cong')
          res.json(user)
        }
      }
    ) 
});

module.exports = router